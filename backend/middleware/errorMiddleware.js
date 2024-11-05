// Middleware pour gérer les routes inexistantes (404)
const notFound = (req, res, next) => {
  // Création d'une nouvelle erreur avec le message de route non trouvée
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Définition du code de statut HTTP 404
  next(error); // Passe l'erreur au middleware suivant (ici `errorHandler`)
};

// Middleware pour gérer les erreurs générales
const errorHandler = (err, req, res, next) => {
  // Si le statut actuel est 200 (par défaut), on le remplace par 500 (erreur serveur)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Gestion spécifique pour les erreurs de type "CastError" (ObjectId invalide ou inexistant)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found"; // Message d'erreur plus clair
    statusCode = 404; // Réglage du code de statut à 404 (ressource non trouvée)
  }

  // Envoie de la réponse JSON avec le message d'erreur et le stack trace (trace de l'erreur)
  res.status(statusCode).json({
    message,
    // Affiche la trace d'erreur (stack) seulement en développement pour éviter les fuites d'informations
    stack: process.env.NODE_ENV === "production" ? "Oh nooo !!! " : err.stack,
  });
};

// Export des fonctions `notFound` et `errorHandler` pour les utiliser dans le serveur
export { notFound, errorHandler };
