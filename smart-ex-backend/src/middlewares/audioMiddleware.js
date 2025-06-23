// import vosk from 'vosk';
// import fs from 'fs';
// import path from 'path';

// const modelPath = path.resolve('./models/vosk-model-en-us-0.22');
// let model;

// try {
//   model = new vosk.Model(modelPath);
//   console.log('🧠 Vosk model loaded.');
// } catch (error) {
//   console.error('❌ Failed to load Vosk model:', error);
// }

// const audioMiddleware = async (req, res, next) => {
//   try {
//     if (!model) {
//       return res.status(500).json({ error: 'Vosk model not available' });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: 'Audio file is required' });
//     }

//     const audioPath = req.file.path;
//     const recognizer = new vosk.Recognizer({ model, sampleRate: 16000 });

//     const audioStream = fs.createReadStream(audioPath);
//     audioStream.on('data', (chunk) => recognizer.acceptWaveform(chunk));

//     audioStream.on('end', () => {
//       const result = recognizer.finalResult();
//       recognizer.free(); // 🧼 Free memory

//       console.log('🗣️ Speech Result:', result);

//       const suspiciousWords = ['cheat', 'help', 'someone', 'talking', 'shadow'];
//       const isSuspicious = suspiciousWords.some((word) => result.text.toLowerCase().includes(word));

//       if (isSuspicious) {
//         return res.status(403).json({ alert: '⚠️ Suspicious speech detected!' });
//       }

//       next();
//     });

//   } catch (error) {
//     console.error('❌ Audio Middleware Error:', error);
//     res.status(500).json({ error: 'Audio processing failed' });
//   }
// };

// export default audioMiddleware;
// In audioMiddleware.js
export const processAudio = (req, res, next) => {
  // ... audio processing logic
  next();
};

export const anotherFunction = () => {
  // ... some other function
};