import { Layout } from "../layouts/Layout";
import { Nav } from "../layouts/Nav";
import { NotFound } from "../pages/404";

export const ROUTE_CHANGED_EVENT = "route-changed";

export const app = (elementId, routes) => {
  const appElement = document.querySelector(elementId);

  if (!appElement) {
    console.error(`Element with ID ${elementId} not found!`);
    return;
  }

  // Injecter le layout
  appElement.innerHTML = Layout();

  const headerElement = document.querySelector("header");
  const mainElement = document.querySelector("main");

  if (headerElement) {
    Nav(headerElement);
  } else {
    console.error("Header element not found!");
  }

  const changePage = () => {
    const path = window.location.pathname;

    let page = routes[path];

    // Vérifier si la route est dynamique (par exemple, /event/1)
    if (!page) {
      const dynamicRoute = Object.keys(routes).find(
        (route) =>
          route.includes(":id") &&
          new RegExp(route.replace(":id", "\\d+")).test(path)
      );

      if (dynamicRoute) {
        page = routes[dynamicRoute];
      }
    }

    if (!page) {
      page = NotFound;
    }

    page(mainElement);
  };

  changePage();

  headerElement.addEventListener(ROUTE_CHANGED_EVENT, () => {
    changePage();
  });

  window.addEventListener("popstate", () => {
    changePage();
  });
};
