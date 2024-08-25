import { ROUTE_CHANGED_EVENT } from "../framework/app";

// Fonction pour récupérer le nombre d'articles dans le panier
const getCartItemCount = () => {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  return panier.length;
};

export const Nav = (element) => {
  const appName = "EventMaster";

  /**
   * @type {Link[]}
   */
  const links = [
    { href: "/", text: "Accueil" },
    { href: "/events", text: "Événements" },
    { href: "/contact", text: "Contact" },
    { href: "/about", text: "À Propos" },
  ];

  element.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand text-primary fw-bold" href="/">${appName}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            ${links
              .map(
                (link) => `
                <li class="nav-item">
                  <a class="nav-link text-secondary fw-semibold" href="${link.href}">${link.text}</a>
                </li>`
              )
              .join("")}
            <li class="nav-item">
              <a class="nav-link text-secondary fw-semibold" href="/panier">
                Panier <span class="badge bg-primary" id="cart-count">${getCartItemCount()}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Remplace les liens par des événements de navigation
  const replaceLinksByEvents = () => {
    const navLinks = element.querySelectorAll("a");

    const linkClickHandler = (event) => {
      event.preventDefault();
      window.history.pushState({}, "", event.target.href);
      element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
    };

    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", linkClickHandler);
    }
  };

  const removeActive = () => {
    const activeLink = element.querySelector("a.active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
  };

  const markAsActive = () => {
    const activeLink = element.querySelector(
      `a.nav-link[href="${window.location.pathname}"]`
    );
    if (!activeLink) {
      return;
    }
    activeLink.classList.add("active", "text-primary");
  };

  const changePageTitle = () => {
    const activeLink = element.querySelector("a.active");
    if (!activeLink) {
      document.title = appName;
      return;
    }
    document.title = `${activeLink.textContent} - ${appName}`;
  };

  // Initialise la barre de navigation
  markAsActive();
  replaceLinksByEvents();
  changePageTitle();

  // Ajoute un écouteur d'événement pour gérer les événements de navigation du navigateur (précédent/suivant)
  window.addEventListener("popstate", () => {
    removeActive();
    markAsActive();
    changePageTitle();
    element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
  });
};
