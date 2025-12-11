import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import mealPlanRoutes from "./routes/mealPlanRoutes.js";

dotenv.config();

const app = express();

// ---------- CORS FIX ----------
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ---------- MONGO CONNECTION ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully 🚀"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));

// ---------- ROUTES ----------
app.get("/", (req, res) => {
  res.json({ message: "PlatePlanner Backend Running ✔" });
});

app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/mealplan", mealPlanRoutes);

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
