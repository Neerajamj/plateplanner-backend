import express from "express";
import MealPlan from "../models/mealPlanModel.js";

const router = express.Router();

// SAVE WEEKLY PLAN
router.post("/save", async (req, res) => {
  try {
    const { userId, plan } = req.body;

    // If plan exists → update
    let mealPlan = await MealPlan.findOne({ userId });

    if (mealPlan) {
      mealPlan.plan = plan;
      await mealPlan.save();
    } else {
      mealPlan = await MealPlan.create({ userId, plan });
    }

    res.json({ message: "Meal plan saved", mealPlan });
  } catch (err) {
    res.status(500).json({ error: "Failed to save meal plan" });
  }
});

// GET WEEKLY PLAN
router.get("/get/:userId", async (req, res) => {
  try {
    const mealPlan = await MealPlan.findOne({ userId: req.params.userId });
    res.json(mealPlan || { plan: {} });
  } catch (err) {
    res.status(500).json({ error: "Failed to load meal plan" });
  }
});

export default router;
