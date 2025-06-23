import * as tf from '@tensorflow/tfjs-node';
import * as faceapi from 'face-api.js';
import canvas, { Image, ImageData } from 'canvas';

// Fix: MonkeyPatch the canvas correctly
faceapi.env.monkeyPatch(canvas);

// Load models once and store in a global promise
const modelLoadPromise = (async () => {
    try {
        await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
        await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
        console.log("✅ Face detection models loaded successfully.");
    } catch (error) {
        console.error("❌ Error loading models:", error);
    }
})();

// AI Middleware
const aiMiddleware = async (req, res, next) => {
    try {
        // Ensure models are loaded before proceeding
        await modelLoadPromise;

        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        // Convert Base64 image to Buffer
        const imgBuffer = Buffer.from(image, "base64");
        const decodedImage = tf.node.decodeImage(imgBuffer);

        if (!decodedImage) {
            return res.status(400).json({ error: "Invalid image format" });
        }

        // Convert decoded image to Canvas
        const imgCanvas = canvas.createCanvas(decodedImage.shape[1], decodedImage.shape[0]);
        const ctx = imgCanvas.getContext('2d');
        const img = new Image();
        img.src = imgBuffer;
        ctx.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height);

        // Detect faces
        const faceDetections = await faceapi.detectAllFaces(imgCanvas, new faceapi.SsdMobilenetv1Options());

        if (faceDetections.length > 1) {
            return res.status(403).json({ alert: "Multiple faces detected!" });
        }

        if (faceDetections.length === 0) {
            return res.status(403).json({ alert: "No face detected!" });
        }

        next();
    } catch (error) {
        console.error("❌ AI Middleware Error:", error);
        res.status(500).json({ error: "AI processing failed" });
    }
};

export default aiMiddleware;
