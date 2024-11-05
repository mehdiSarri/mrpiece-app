import mongoose from "mongoose";

// Définition du schema de sous-document `reviewSchema` pour les avis des utilisateurs
const reviewSchema = new mongoose.Schema(
  {
    user: {
      // Référence à l'ID d'un utilisateur, assurant qu'un avis est associé à un utilisateur spécifique
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Utilisé pour la population (remplissage) de données d'utilisateur
    },
    name: {
      // Nom de l'utilisateur qui a laissé l'avis
      type: String,
      required: true,
    },
    comment: {
      // Texte du commentaire de l'utilisateur
      type: String,
      required: true,
    },
    rating: {
      // Note de l'utilisateur (par exemple, sur 5 étoiles)
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement les champs `createdAt` et `updatedAt` pour chaque avis
  }
);

// Définition du schema principal `productSchema` pour les produits
const productSchema = new mongoose.Schema(
  {
    user: {
      // Référence au vendeur/administrateur qui a ajouté le produit
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Utilisé pour retrouver les informations de l'utilisateur qui a ajouté le produit
    },
    name: {
      // Nom du produit
      type: String,
      required: true,
    },
    image: {
      // URL ou chemin de l'image du produit (permet d'afficher une image associée)
      type: String,
      required: true,
    },
    category: {
      // Catégorie du produit (ex: "tableaux", "sculptures")
      type: String,
      required: true,
    },
    description: {
      // Description détaillée du produit
      type: String,
      required: true,
    },
    reviews: [reviewSchema], // Tableau d'avis liés au produit, basé sur le sous-schema `reviewSchema`
    rating: {
      // Note moyenne du produit, calculée en fonction des avis
      type: Number,
      required: true,
      default: 0, // Valeur par défaut (aucun avis donné)
    },
    numReviews: {
      // Nombre total d'avis pour le produit
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      // Prix du produit
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      // Quantité disponible en stock pour le produit
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true } // Ajoute automatiquement `createdAt` et `updatedAt` pour chaque produit
);

// Création et exportation du modèle `Product` basé sur le schema `productSchema`
const Product = mongoose.model("Product", productSchema);

export default Product;
