import express from "express";
import { proctorMiddleware } from "../middlewares/proctorMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// Capture snapshot, analyze it, and respond with suspicion level
router.post("/snapshot", authMiddleware, proctorMiddleware, (req, res) => {
  try {
    res.status(200).json({
      message: "✅ Snapshot captured successfully",
      suspicionLevel: req.proctorData.suspicionLevel,
      tabSwitchCount: req.proctorData.tabSwitchCount,
      focusLossCount: req.proctorData.focusLossCount,
      snapshotPath: req.proctorData.snapshotPath,
    });
  } catch (error) {
    console.error("❌ Error in snapshot route:", error);
    res.status(500).json({ message: "Error capturing snapshot", error: error.message });
  }
});

export default router;
