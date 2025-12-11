import express from "express";
import MealPlan from "../models/mealPlanModel.js";

const router = express.Router();

/* ---------------------------
   GET MEAL PLAN BY USER
--------------------------- */
router.get("/:userId", async (req, res) => {
  try {
    const plan = await MealPlan.findOne({ userId: req.params.userId });
    res.json(plan || {}); // return empty if not found
  } catch (err) {
    res.status(500).json({ error: "Error fetching meal plan" });
  }
});

/* ---------------------------
   SAVE MEAL PLAN
--------------------------- */
router.post("/save", async (req, res) => {
  try {
    const { userId, week } = req.body;

    if (!userId || !week) {
      return res.status(400).json({ error: "Missing userId or week data" });
    }

    let plan = await MealPlan.findOne({ userId });

    if (plan) {
      plan.week = week;
      await plan.save();
    } else {
      plan = await MealPlan.create({ userId, week });
    }

    res.json({ message: "Saved", plan });
  } catch (err) {
    console.log("SAVE ERROR:", err);
    res.status(500).json({ error: "Error saving meal plan" });
  }
});

export default router;
