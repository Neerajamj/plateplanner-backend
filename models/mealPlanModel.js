import mongoose from "mongoose";

const MealPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  week: {
    monday: { type: Object, default: null },
    tuesday: { type: Object, default: null },
    wednesday: { type: Object, default: null },
    thursday: { type: Object, default: null },
    friday: { type: Object, default: null },
    saturday: { type: Object, default: null },
    sunday: { type: Object, default: null }
  }
}, { timestamps: true });

export default mongoose.model("MealPlan", MealPlanSchema);
