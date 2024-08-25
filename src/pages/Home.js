export const Home = (element) => {
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
        <div class="col-md-4">
          <div class="card border-primary shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-primary">Événement 1</h5>
              <p class="card-text">Description de l'événement 1.</p>
              <a href="/event/1" class="btn btn-outline-primary">Voir les détails</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-primary shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-primary">Événement 2</h5>
              <p class="card-text">Description de l'événement 2.</p>
              <a href="/event/2" class="btn btn-outline-primary">Voir les détails</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-primary shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-primary">Événement 3</h5>
              <p class="card-text">Description de l'événement 3.</p>
              <a href="/event/3" class="btn btn-outline-primary">Voir les détails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
