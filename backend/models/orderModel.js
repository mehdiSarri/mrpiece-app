import mongoose from "mongoose";

// Définition du schéma pour le modèle Order
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Référence à un utilisateur
      required: true,
      ref: "User", // Référence à la collection User
    },
    orderItems: [
      // Tableau d'objets pour les articles de la commande
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId, // Référence à un produit
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      // Adresse de livraison
      adress: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      // Détails sur le paiement
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date, // Date de paiement
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    delivredAt: {
      type: Date, // Date de livraison
    },
  },
  {
    timestamps: true, // Ajoute les timestamps
  }
);

// Création du modèle Order basé sur le schéma
const Order = mongoose.model("Order", orderSchema);
export default Order; // Exporte le modèle Order
