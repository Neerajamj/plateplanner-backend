import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import mealPlanRoutes from "./routes/mealPlanRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully 🚀"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "PlatePlanner Backend Running ✔" });
});

// Auth Routes
app.use("/auth", authRoutes);

// Recipe Routes
app.use("/recipes", recipeRoutes);

// Meal Plan Routes
app.use("/mealplan", mealPlanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
