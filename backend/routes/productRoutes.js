import express from "express";
// On importe Express pour pouvoir utiliser le routeur. Le routeur est un mini-serveur permettant de définir des routes de manière modulaire.

const router = express.Router();
// On crée un nouvel objet `router` en utilisant `express.Router()`. Cela nous permet de définir des routes spécifiques pour les produits de manière isolée.

import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
// On importe les fonctions `getProducts` et `getProductById` depuis `productController.js`.
// Ce sont les fonctions contrôleurs qui gèrent les requêtes pour obtenir les produits.

router.route("/").get(getProducts);
// Définition de la route pour obtenir tous les produits.
// Quand une requête GET est envoyée vers `/api/products`, la fonction `getProducts` est exécutée.

router.route("/:id").get(getProductById);
// Définition de la route pour obtenir un produit spécifique via son ID.
// Quand une requête GET est envoyée vers `/api/products/:id` (ex : `/api/products/123`), `getProductById` est exécutée.
// `:id` est une variable dynamique qui capture l'ID du produit depuis l'URL.

export default router;
// On exporte `router` pour pouvoir l'utiliser dans `server.js` ou d'autres fichiers.
// Avec cet export, le serveur principal saura qu'il doit utiliser ces routes pour gérer les requêtes produits.
