import eventsData from "../storage/events.json";

// Fonction pour récupérer tous les clients
function getClients() {
  return JSON.parse(localStorage.getItem("clients")) || [];
}

// Fonction pour ajouter ou récupérer un client
function addOrUpdateClient(clientData) {
  let clients = getClients();
  let client = clients.find((c) => c.email === clientData.email);

  if (!client) {
    clientData.id = clients.length ? clients[clients.length - 1].id + 1 : 1;
    clients.push(clientData);
    localStorage.setItem("clients", JSON.stringify(clients));
    return clientData.id;
  } else {
    client = { ...client, ...clientData };
    clients = clients.map((c) => (c.id === client.id ? client : c));
    localStorage.setItem("clients", JSON.stringify(clients));
    return client.id;
  }
}

// Fonction pour récupérer toutes les réservations
function getReservations() {
  return JSON.parse(localStorage.getItem("reservations")) || [];
}

// Fonction pour ajouter une nouvelle réservation
function addReservation(reservation) {
  const reservations = getReservations();
  reservation.id = reservations.length
    ? reservations[reservations.length - 1].id + 1
    : 1;
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));
}

export const Event = (element) => {
  const eventId = window.location.pathname.split("/").pop();
  const event = eventsData.find((e) => e.id == eventId);

  if (!event) {
    element.innerHTML = `
      <div class="container mt-5 text-center">
        <h1 class="text-danger">Événement non trouvé</h1>
        <p>Désolé, l'événement que vous cherchez n'existe pas.</p>
        <a href="/events" class="btn btn-secondary">Retour à la liste des événements</a>
      </div>
    `;
  } else {
    element.innerHTML = `
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6">
            <h1 class="text-primary">${event.name}</h1>
            <img src="${event.image}" class="img-fluid rounded shadow" alt="${event.name}">
            <p class="mt-4"><strong>Date:</strong> <span class="text-info">${event.date}</span></p>
            <p><strong>Lieu:</strong> <span class="text-success">${event.location}</span></p>
            <p>${event.description}</p>
          </div>
          <div class="col-md-6">
            <div class="card shadow-sm border-info">
              <div class="card-body">
                <h2 class="card-title text-info">Réserver des places</h2>
                <form id="reservationForm" class="mt-3">
                  <div class="mb-3">
                    <label for="firstName" class="form-label">Prénom</label>
                    <input type="text" class="form-control border-primary" id="firstName" required placeholder="Entrez votre prénom">
                  </div>
                  <div class="mb-3">
                    <label for="lastName" class="form-label">Nom</label>
                    <input type="text" class="form-control border-primary" id="lastName" required placeholder="Entrez votre nom">
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control border-primary" id="email" required placeholder="Entrez votre email">
                  </div>
                  <div class="mb-3">
                    <label for="numberOfSeats" class="form-label">Nombre de places</label>
                    <input type="number" class="form-control border-primary" id="numberOfSeats" required placeholder="Nombre de places">
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">Réserver</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document
      .getElementById("reservationForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const clientData = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
        };
        const clientId = addOrUpdateClient(clientData);
        const newReservation = {
          clientId: clientId,
          eventId: parseInt(eventId),
          numberOfSeats: parseInt(
            document.getElementById("numberOfSeats").value
          ),
        };
        addReservation(newReservation);
        alert("Réservation ajoutée avec succès!");
      });
  }
};
