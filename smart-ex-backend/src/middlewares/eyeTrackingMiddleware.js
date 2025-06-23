import * as faceapi from "face-api.js";

export const detectEyeMovement = async (videoElement) => {
    try {
        const detection = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        if (!detection) return { alert: "No face detected!" };

        const landmarks = detection.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        if (!leftEye || !rightEye) return { alert: "Eyes not detected!" };

        // Eye Aspect Ratio (EAR) Calculation for Eye Closure Detection
        const eyeAspectRatio = (eye) => {
            const [p1, p2, p3, p4, p5, p6] = eye;
            const vertical1 = Math.hypot(p2.y - p6.y, p2.x - p6.x);
            const vertical2 = Math.hypot(p3.y - p5.y, p3.x - p5.x);
            const horizontal = Math.hypot(p1.y - p4.y, p1.x - p4.x);
            return (vertical1 + vertical2) / (2.0 * horizontal);
        };

        const leftEAR = eyeAspectRatio(leftEye);
        const rightEAR = eyeAspectRatio(rightEye);

        // If EAR is very low, eyes are closed (Possible drowsiness)
        if (leftEAR < 0.2 && rightEAR < 0.2) {
            return { alert: "Drowsiness detected! Eyes closed for too long." };
        }

        // If one eye is looking significantly away
        const eyeMovementThreshold = 0.3;
        if (Math.abs(leftEAR - rightEAR) > eyeMovementThreshold) {
            return { alert: "Eye movement detected! Looking away from the screen." };
        }

        return { message: "Eye movement normal." };

    } catch (error) {
        console.error("❌ Eye Tracking Error:", error);
        return { error: "Eye tracking failed." };
    }
};
