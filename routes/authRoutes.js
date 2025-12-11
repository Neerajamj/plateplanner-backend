import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.json({ error: "Username already taken" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPass
    });

    res.json({
      message: "User registered",
      userId: newUser._id
    });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.json({ error: "User not found" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "Login successful",
      token,
      userId: user._id
    });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});
// GET USER PROFILE
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

export default router;
