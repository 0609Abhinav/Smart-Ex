// import React, { useRef, useState } from 'react';

// const TestPage = () => {
//   const [testStarted, setTestStarted] = useState(false);
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);

//   const startTest = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.onloadedmetadata = () => {
//           videoRef.current.play();
//         };
//       }

//       setTestStarted(true);
//     } catch (err) {
//       console.error('Camera access denied:', err);
//       alert('Camera permission is required to start the test.');
//     }
//   };

//   const finishTest = () => {
//     setTestStarted(false);

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }

//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-2xl font-bold mb-4">🧠 AI Proctored Test</h1>

//       {!testStarted ? (
//         <button
//           onClick={startTest}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Start Test
//         </button>
//       ) : (
//         <>
//           <p className="mb-4">Test is running... Your camera is being monitored.</p>
//           <button
//             onClick={finishTest}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Finish Test
//           </button>
//         </>
//       )}

//       {/* Camera feed box */}
//       {testStarted && (
//         <div
//           className="fixed bottom-4 right-4 border border-gray-700 rounded overflow-hidden shadow-lg"
//           style={{
//             width: '200px',
//             height: '150px',
//             backgroundColor: 'black',
//           }}
//         >
//          <video
//   ref={videoRef}
//   autoPlay
//   muted
//   playsInline
//   className="w-full rounded-lg border border-gray-600 shadow-lg"
//   style={{ aspectRatio: "4 / 3", objectFit: "cover", backgroundColor: "black" }}
// />
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestPage;
