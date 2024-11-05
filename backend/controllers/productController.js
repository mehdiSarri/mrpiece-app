import asyncHandler from "../middleware/asyncHandler.js";
// On importe le middleware `asyncHandler`. Ce middleware est utilisé pour simplifier la gestion des erreurs dans les fonctions asynchrones.
// `asyncHandler` attrape automatiquement les erreurs et les transmet au middleware de gestion d'erreurs global.

import Product from "../models/productModel.js";
// On importe le modèle `Product` pour interagir avec les produits dans la base de données MongoDB.
// Avec ce modèle, on peut faire des opérations comme `find` ou `findById`.

//@Desc     Fetch all products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // On utilise `Product.find({})` pour récupérer tous les produits de la collection MongoDB.
  // `{}` signifie qu'on ne filtre pas les produits : on veut tous les documents de la collection.

  res.json(products);
  // On envoie les produits trouvés sous forme de JSON dans la réponse de la requête.
  // Ce JSON est ensuite envoyé au client (comme un navigateur ou une application frontend) qui a fait la requête.
});

//@Desc     Fetch product
//@route    GET /api/product/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // `Product.findById(req.params.id)` cherche un produit spécifique dans la base de données, basé sur l'ID fourni dans l'URL.
  // `req.params.id` récupère l'ID de l'URL (par ex, `/api/products/123`), ici `123`.

  if (product) {
    return res.json(product);
    // Si le produit est trouvé, on l'envoie sous forme de JSON au client.
  } else {
    res.status(404);
    // Si aucun produit n'est trouvé avec cet ID, on renvoie un statut HTTP 404 (Not Found).
    throw new Error("Resource not found");
    // On lance une erreur avec le message "Resource not found".
    // Cette erreur sera attrapée par `asyncHandler` et gérée par le middleware global d'erreurs.
  }
});

export { getProducts, getProductById };
// On exporte les fonctions `getProducts` et `getProductById` pour pouvoir les utiliser dans d'autres fichiers.
// Ces fonctions seront appelées dans `productRoutes.js` pour définir les routes.
