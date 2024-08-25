import eventsData from "../storage/events.json"; // Assurez-vous d'importer les données des événements

export const Home = (element) => {
  const firstThreeEvents = eventsData.slice(0, 3); // Prendre les 3 premiers événements

  element.innerHTML = `
    <div class="container mt-5">
      <div class="jumbotron bg-light p-5 rounded-lg shadow-sm">
        <h1 class="display-4 text-primary fw-bold">Bienvenue sur EventMaster</h1>
        <p class="lead text-secondary">Gérez vos événements facilement et efficacement.</p>
        <hr class="my-4">
        <p class="text-muted">Découvrez nos événements et commencez à planifier dès aujourd'hui.</p>
        <a class="btn btn-primary btn-lg" href="/events" role="button">Voir les événements</a>
      </div>

      <div class="row mt-5">
        ${firstThreeEvents.map(event => `
          <div class="col-md-4">
            <div class="card border-primary shadow-sm">
              <div class="card-body">
                <h5 class="card-title text-primary">${event.name}</h5>
                <p class="card-text">${event.description.substring(0, 100)}...</p>
                <a href="/event/${event.id}" class="btn btn-outline-primary">Voir les détails</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};
