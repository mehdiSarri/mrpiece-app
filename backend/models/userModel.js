import mongoose from "mongoose";

// Définition du schéma pour le modèle User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Le nom est requis
    },
    email: {
      type: String,
      required: true, // L'email est requis
      unique: true, // L'email doit être unique dans la collection
    },
    password: {
      type: String,
      required: true, // Le mot de passe est requis
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // Par défaut, l'utilisateur n'est pas un admin
    },
  },
  {
    timestamps: true, // Ajoute les champs createdAt et updatedAt
  }
);

// Création du modèle User basé sur le schéma
const User = mongoose.model("User", userSchema);
export default User; // Exporte le modèle User
