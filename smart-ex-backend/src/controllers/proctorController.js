import { proctorMiddleware } from "../middleware/proctorMiddleware.js";

export const captureSnapshot = async (req, res) => {
    try {
        // 🔥 Call AI Proctoring Middleware
        await proctorMiddleware(req, res, () => {});

        console.log("✅ Proctoring data:", req.proctorData);

        res.status(200).json({
            message: "Snapshot processed",
            data: req.proctorData,
        });
    } catch (error) {
        console.error("❌ ProctorController Error:", error);
        res.status(500).json({ message: "Error in snapshot processing", error: error.message });
    }
};
