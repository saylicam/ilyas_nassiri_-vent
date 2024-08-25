import "./style.scss";
import { app } from "./framework/app";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Events } from "./pages/Events";
import { About } from "./pages/About";
import { Event } from "./pages/Event";
import { ReservationsPage } from "./pages/Reservations";
import { NotFound } from "./pages/404";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/events": Events,
  "/about": About,
  "/reservations/:id": ReservationsPage, // Route pour gérer les réservations pour un événement
  "/event/:id": Event, // Route dynamique pour les événements
};

app("#app", routes);
