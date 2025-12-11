import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String
}, { timestamps: true });  // <-- ADD THIS

export default mongoose.model("User", userSchema);
