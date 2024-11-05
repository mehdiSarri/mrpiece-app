import mongoose from "mongoose"; // Importation de mongoose
import dotenv from "dotenv"; // Pour la gestion des variables d'environnement
import colors from "colors"; // Pour la coloration dans la console
import users from "./data/users.js"; // Importation des données utilisateurs
import products from "./data/products.js"; // Importation des données produits
import User from "./models/userModel.js"; // Importation du modèle User
import Product from "./models/productModel.js"; // Importation du modèle Product
import Order from "./models/orderModel.js"; // Importation du modèle Order
import connectDB from "./config/db.js"; // Connexion à la base de données

dotenv.config(); // Chargement des variables d'environnement
connectDB(); // Connexion à la base de données

const importData = async () => {
  // Fonction pour importer les données
  try {
    await Order.deleteMany(); // Suppression des commandes existantes
    await Product.deleteMany(); // Suppression des produits existants
    await User.deleteMany(); // Suppression des utilisateurs existants

    const createdUsers = await User.insertMany(users); // Insertion des utilisateurs

    const adminUser = createdUsers[0]._id; // Identification de l'utilisateur admin

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // Association de chaque produit à l'utilisateur admin
    });

    await Product.insertMany(sampleProducts); // Insertion des produits d'exemple

    console.log("Data Imported!".green.inverse); // Message de confirmation
    process.exit(); // Terminaison du processus
  } catch (error) {
    console.error(`${error}.red.inverse`); // Gestion des erreurs
    process.exit(1);
  }
};

const destroyData = async () => {
  // Fonction pour détruire les données
  try {
    await Order.deleteMany(); // Suppression des commandes
    await Product.deleteMany(); // Suppression des produits
    await User.deleteMany(); // Suppression des utilisateurs

    console.log("Data Destroyed!".red.inverse); // Message de confirmation
    process.exit(); // Terminaison du processus
  } catch (error) {
    console.error(`${error}.red.inverse`); // Gestion des erreurs
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  // Vérification des arguments pour la destruction des données
  destroyData();
} else {
  importData(); // Importation des données par défaut
}
