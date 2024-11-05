console.log("Bi ismi Allah");
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
// Importation de la fonction `connectDB` qui gère la connexion à MongoDB. Cette fonction est définie dans `db.js`.

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// Importation de deux middlewares de gestion des erreurs depuis `errorMiddleware.js`.
// `notFound` gère les routes non trouvées, et `errorHandler` gère les erreurs générales de l'application.

import productRoutes from "./routes/productRoutes.js";
// Importation des routes pour les produits, définies dans `productRoutes.js`.
// Ces routes vont gérer toutes les requêtes relatives aux produits (comme GET, POST, etc.).

const port = process.env.PORT || 8000;

connectDB();

const app = express();
// Création de l'application Express. `app` sera notre serveur principal pour gérer les requêtes.

app.get("/", (req, res) => {
  res.send("API is running...");
});
// Route de base : lorsqu'un utilisateur visite `/`, il reçoit la réponse "API is running...".

app.use("/api/products", productRoutes);
// Route pour les produits : toutes les requêtes vers `/api/products` seront gérées par `productRoutes`.
// Cela signifie que `productRoutes.js` contiendra probablement des routes comme `/api/products`, `/api/products/:id`, etc.

app.use(notFound);
// Middleware pour les routes non trouvées (404).
// Si une route demandée n'existe pas, `notFound` enverra une réponse indiquant que la route est introuvable.

app.use(errorHandler);
// Middleware global de gestion des erreurs.
// Ce middleware attrape toutes les erreurs non gérées et renvoie une réponse appropriée au client.

app.listen(port, () => console.log(`Server running on port ${port}`));
// Lancement du serveur sur le port défini plus haut.
// Quand le serveur démarre, un message est affiché dans la console pour confirmer qu'il écoute bien sur le port spécifié.
