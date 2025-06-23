import fs from "fs";
import path from "path";
import { promisify } from "util";
import { detectEyeMovement } from "../middlewares/eyeTrackingMiddleware.js";
import aiMiddleware from "../middlewares/aiMiddleware.js";
// import audioMiddleware  from "../middlewares/audioMiddleware.js";

const uploadDir = path.join(process.cwd(), "uploads");
const writeFileAsync = promisify(fs.writeFile);

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 🔥 Full AI Proctor Middleware
export const proctorMiddleware = async (req, res, next) => {
    try {
        const { image, video, audio, tabSwitchCount, focusLossCount } = req.body;
        const userId = req.user?.id || "unknown";

        // ✅ Validate Input
        if (!image || !video || !audio) {
            return res.status(400).json({ message: "Image, video, and audio required" });
        }

        // 📷 Save Snapshot (Base64 to PNG)
        const base64Data = image.replace(/^data:image\/png;base64,/, "");
        const fileName = `${userId}_${Date.now()}.png`;
        const filePath = path.join(uploadDir, fileName);
        await writeFileAsync(filePath, base64Data, "base64");
        console.log(`✅ Snapshot saved: ${fileName}`);

        // 🧠 Face & Suspicious Activity Detection
        const faceDetectionResult = await aiMiddleware(req, res, () => {});
        if (faceDetectionResult && faceDetectionResult.error) return res.status(403).json(faceDetectionResult);

        // 👀 Eye Movement Detection
        const eyeTrackingResult = await detectEyeMovement(video);
        if (eyeTrackingResult && eyeTrackingResult.alert) return res.status(403).json(eyeTrackingResult);

        // 🎙️ Audio Analysis
        const audioAnalysis = await audioMiddleware(req, res, () => {});
        if (audioAnalysis && audioAnalysis.alert) return res.status(403).json(audioAnalysis);

        // ⚠️ Suspicious Activity Detection
        let suspicionLevel = "Normal";
        if (tabSwitchCount > 3 || focusLossCount > 3) {
            suspicionLevel = "Suspicious";
        }

        req.proctorData = {
            snapshotPath: filePath,
            tabSwitchCount,
            focusLossCount,
            suspicionLevel,
            faceDetection: faceDetectionResult || "No issue",
            eyeTracking: eyeTrackingResult || "No issue",
            audioAnalysis: audioAnalysis || "No issue",
        };

        console.log("🚀 Proctoring Data:", req.proctorData);
        next();
    } catch (error) {
        console.error("❌ Proctor Middleware Error:", error);
        res.status(500).json({ message: "Error in AI proctoring", error: error.message });
    }
};
