import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  plan: {
    type: Object,   // { Monday: {...}, Tuesday: {...}, ... }
    required: true
  }
});

export default mongoose.model("MealPlan", mealPlanSchema);
