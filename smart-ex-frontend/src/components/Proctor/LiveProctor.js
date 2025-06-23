import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveProctor = () => {
  const [isSuspicious, setIsSuspicious] = useState(false);
  const [reason, setReason] = useState('');
  
  // Capture webcam frame and send for analysis
  const captureFrame = () => {
    const canvas = document.createElement('canvas');
    const video = document.querySelector('video');  // Assuming you have a video element

    // Draw the current video frame to canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Return the base64 representation of the image
    return canvas.toDataURL('image/jpeg');
  };

  const sendFrameForAnalysis = async () => {
    const image = captureFrame();
    try {
      const response = await axios.post('/api/proctor/detect', { image });
      setIsSuspicious(response.data.suspicious);
      setReason(response.data.reason);
    } catch (error) {
      console.error('Error analyzing frame:', error);
    }
  };

  // Set interval for sending frames every few seconds
  useEffect(() => {
    const intervalId = setInterval(sendFrameForAnalysis, 3000); // Every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <video id="webcam" width="640" height="480" autoPlay />
      <div>
        {isSuspicious ? (
          <p style={{ color: 'red' }}>Suspicious activity detected: {reason}</p>
        ) : (
          <p>Monitoring for suspicious activity...</p>
        )}
      </div>
    </div>
  );
};

export default LiveProctor;
