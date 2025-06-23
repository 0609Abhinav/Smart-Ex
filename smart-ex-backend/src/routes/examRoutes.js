import express from "express";
import { createExam, getExams } from "../controllers/examController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // ✅ Correct

const router = express.Router();

// ✅ Role-Based Access Control Middleware
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  if (!req.user.role) {
    return res.status(403).json({ error: "User role is undefined. Access Denied" });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access Denied. Insufficient Permissions" });
  }
  next();
};

// ✅ Create Exam - Only Admins & Proctors can create exams
router.post("/exams/create", authMiddleware, authorizeRoles("admin", "proctor"), createExam);

// ✅ Get Exams - Students can see their assigned exams, Admins/Proctors can see all
router.get("/exams/list", authMiddleware, async (req, res) => {
  try {
    const userRole = req.user.role;
    
    if (userRole === "admin" || userRole === "proctor") {
      return await getExams(req, res); // Admins & Proctors see all exams
    } else if (userRole === "student") {
      req.query.studentId = req.user.id; // Pass Student ID to get only assigned exams
      return await getExams(req, res);
    } else {
      return res.status(403).json({ error: "Access Denied. Invalid Role" });
    }
  } catch (error) {
    console.error("Exam List Error:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
