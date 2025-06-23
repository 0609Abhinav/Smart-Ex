// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js"; // Ensure `.js` extension is included
// import dotenv from "dotenv";

// dotenv.config(); // ✅ Load environment variables

// const router = express.Router();

// // ✅ User Registration
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ❌ Prevent duplicate registrations
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     // ✅ Hash password securely before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ error: "Registration failed" });
//   }
// });

// // ✅ User Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 🔍 Find user in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // ✅ Compare password securely
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // ✅ Generate JWT Token
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// export default router;
import express from "express";
import User from "../models/User.js";
import AuthLog from "../models/AuthLog.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, rollNumber, branch, course, dob, year } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password, rollNumber, branch, course, dob, year });
    await newUser.save();

    await AuthLog.create({ userId: newUser._id, action: "REGISTER" });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
