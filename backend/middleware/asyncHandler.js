const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // Gestion des erreurs pour les fonctions asynchrones
};

export default asyncHandler; // Exporte la fonction asyncHandler
