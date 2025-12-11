import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String, // URL
  ingredients: [ingredientSchema],
  steps: [String],
  tags: [String], // e.g. ["veg", "vegan", "high-protein", "budget"]
  cookTime: Number, // in minutes
  calories: Number,
  costLevel: String, // "budget" | "medium" | "premium"
});

export default mongoose.model("Recipe", recipeSchema);
