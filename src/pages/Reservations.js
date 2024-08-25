import eventsData from "../storage/events.json"; // Assurez-vous d'importer les données des événements

export const ReservationsPage = (element, eventId) => {
  const reservations = getReservations().filter(
    (reservation) => reservation.eventId == eventId
  );
  let reservationsHTML = "";

  reservations.forEach((reservation) => {
    const client = getClients().find(
      (client) => client.id === reservation.clientId
    );
    reservationsHTML += `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${client.firstName} ${client.lastName}</h5>
            <p class="card-text">Places réservées: ${reservation.numberOfSeats}</p>
            <p class="card-text"><small class="text-muted">Email: ${client.email}</small></p>
            <button class="btn btn-danger" onclick="deleteReservation(${reservation.id})">Supprimer</button>
          </div>
        </div>
      `;
  });

  element.innerHTML = `
      <div class="container mt-5">
        <h1>Réservations pour l'Événement</h1>
        ${reservationsHTML}
        <button class="btn btn-primary" onclick="showAddReservationForm()">Ajouter une Réservation</button>
        <div id="reservationFormContainer" class="mt-4"></div>
      </div>
    `;

  // Fonction pour afficher le formulaire d'ajout de réservation
  window.showAddReservationForm = () => {
    document.getElementById("reservationFormContainer").innerHTML = `
        <h2>Ajouter une Réservation</h2>
        <form id="reservationForm">
          <div class="mb-3">
            <label for="firstName" class="form-label">Prénom</label>
            <input type="text" class="form-control" id="firstName" required>
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Nom</label>
            <input type="text" class="form-control" id="lastName" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
            <label for="numberOfSeats" class="form-label">Nombre de places</label>
            <input type="number" class="form-control" id="numberOfSeats" required>
          </div>
          <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
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

        // Récupérer les détails de l'événement
        const eventDetails = eventsData.find((e) => e.id == eventId);

        const newReservation = {
          clientId: clientId,
          eventId: eventId,
          numberOfSeats: parseInt(
            document.getElementById("numberOfSeats").value
          ),
          eventName: eventDetails.name, // Ajouter le nom de l'événement
          eventDate: eventDetails.date, // Ajouter la date de l'événement
          eventLocation: eventDetails.location, // Ajouter le lieu de l'événement
          eventImage: eventDetails.image, // Ajouter l'image de l'événement
        };

        // Ajout de la réservation au panier au lieu de la base de données
        addToCart(newReservation);
        alert("Réservation ajoutée au panier avec succès!");
        ReservationsPage(element, eventId); // Rafraîchir la page pour afficher la nouvelle réservation
      });
  };

  // Fonction pour supprimer une réservation
  window.deleteReservation = (reservationId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      deleteReservation(reservationId);
      ReservationsPage(element, eventId); // Rafraîchir la page pour mettre à jour la liste des réservations
    }
  };
};

// Fonction pour ajouter une réservation au panier
const addToCart = (reservation) => {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.push(reservation);
  localStorage.setItem("panier", JSON.stringify(panier));

  // Mise à jour du nombre d'articles dans le panier dans la navigation
  document.getElementById('cart-count').textContent = panier.length;
};
