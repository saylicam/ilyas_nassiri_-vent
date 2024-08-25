import eventsData from "../storage/events.json"; // Importer les données JSON

export const Events = (element) => {
  let eventsHTML = "";

  // Générer le contenu HTML pour chaque événement
  eventsData.forEach((event) => {
    console.log("Chargement de l'événement:", event); // Ajout du log pour chaque événement
    eventsHTML += `
      <div class="col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
        <div class="card shadow-sm">
          <img src="${event.image}" class="card-img-top" alt="${event.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text text-muted">${event.description.substring(0, 100)}...</p>
            <div class="mt-auto">
              <a href="/event/${event.id}" class="btn btn-outline-primary btn-block">Voir les détails</a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  element.innerHTML = `
    <div class="container mt-5">
      <h1 class="text-center mb-4">Nos Événements</h1>
      <div class="row">
        ${eventsHTML}
      </div>
    </div>
  `;
};
