import express from "express";
import { submitResult, getResults } from "../controllers/resultController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // ✅ Correct


const router = express.Router();

// Submit result
router.post("/submit", authMiddleware, submitResult);

// Get user's exam results
router.get("/my-results", authMiddleware, getResults);

export default router;
