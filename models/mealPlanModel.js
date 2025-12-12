import mongoose from "mongoose";

const MealPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  week: {
    monday: { type: Array, default: [] },
    tuesday: { type: Array, default: [] },
    wednesday: { type: Array, default: [] },
    thursday: { type: Array, default: [] },
    friday: { type: Array, default: [] },
    saturday: { type: Array, default: [] },
    sunday: { type: Array, default: [] },
  }
}, { timestamps: true });

export default mongoose.model("MealPlan", MealPlanSchema);
