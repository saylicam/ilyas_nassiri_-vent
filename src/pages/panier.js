export const Panier = (element) => {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    if (panier.length === 0) {
        element.innerHTML = `
        <div class="container mt-5">
          <h2 class="text-primary">Votre panier est vide</h2>
          <p class="lead">Ajoutez des événements à votre panier pour les voir ici.</p>
          <a href="/events" class="btn btn-primary">Voir les événements</a>
        </div>
      `;
        return;
    }

    let panierHTML = "";
    panier.forEach((item, index) => {
        panierHTML += `
        <div class="card mb-3 shadow-sm">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${item.eventImage}" class="img-fluid rounded-start" alt="${item.eventName}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title text-primary">${item.eventName}</h5>
                <p class="card-text">Date: ${item.eventDate}</p>
                <p class="card-text">Lieu: ${item.eventLocation}</p>
                <p class="card-text">Places réservées: ${item.numberOfSeats}</p>
                <button class="btn btn-danger" onclick="removeFromPanier(${index})">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    element.innerHTML = `
      <div class="container mt-5">
        <h2 class="text-primary">Votre Panier</h2>
        ${panierHTML}
        <a href="/events" class="btn btn-secondary mt-4">Continuer vos achats</a>
        <button class="btn btn-success mt-4">Passer la commande</button>
      </div>
    `;

    // Fonction pour supprimer un événement du panier
    window.removeFromPanier = (index) => {
        panier.splice(index, 1);
        localStorage.setItem("panier", JSON.stringify(panier));
        Panier(element); // Recharger la page du panier
    };
};
