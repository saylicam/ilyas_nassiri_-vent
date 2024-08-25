export const NotFound = (element) => {
  element.innerHTML = `
    <div class="container mt-5 text-center">
      <h1>404 - Page Non Trouvée</h1>
      <p>Désolé, la page que vous cherchez n'existe pas.</p>
      <a href="/" class="btn btn-primary">Retour à l'accueil</a>
    </div>
  `;
};
