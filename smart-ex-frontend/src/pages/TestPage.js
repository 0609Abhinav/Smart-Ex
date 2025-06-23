import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaClock, FaCheckCircle, FaTimesCircle, FaCamera } from "react-icons/fa";

const TestPage = () => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [testFinished, setTestFinished] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [fullScreenWarning, setFullScreenWarning] = useState(false);

  

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      const fullscreen = !!document.fullscreenElement;
      setIsFullScreen(fullscreen);

      if (isTestStarted && !testFinished && !fullscreen) {
        setFullScreenWarning(true);
        setTimeout(() => {
          if (!document.fullscreenElement) {
            goFullScreen();
          }
        }, 500);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, [isTestStarted, testFinished]);

  // Periodic fullscreen check
  useEffect(() => {
    if (isTestStarted && !testFinished) {
      fullScreenCheckInterval.current = setInterval(() => {
        if (!document.fullscreenElement) {
          setFullScreenWarning(true);
          goFullScreen();
        }
      }, 1000);
    }

    return () => {
      if (fullScreenCheckInterval.current) clearInterval(fullScreenCheckInterval.current);
    };
  }, [isTestStarted, testFinished]);

  const finishTest = useCallback(async () => {
    setTestFinished(true);
    await exitFullScreen();
    stopCamera();
  }, []);

  // Handle tab switch detection
  useEffect(() => {
    if (!isTestStarted || !isFullScreen) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newCount = tabSwitchCount + 1;
        setTabSwitchCount(newCount);

        if (newCount >= 3) {
          alert("Test stopped due to multiple tab switches!");
          finishTest();
        } else {
          alert(`Warning: You have switched tabs ${newCount} times. Max 3 allowed.`);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isTestStarted, isFullScreen, tabSwitchCount, finishTest]);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const testContainerRef = useRef(null);
  const fullScreenCheckInterval = useRef(null);
  // Camera start
const startCamera = async () => {
  try {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user",
      },
    });

    
    streamRef.current = await stream;
    console.log("Got camera stream:", streamRef.current);


    if (videoRef.current) {
      videoRef.current.srcObject = stream;

      // Debug: Listen for loadeddata event to confirm video feed started
      videoRef.current.onloadeddata = () => {
        console.log("Video data loaded and playing");
      };

      // Play video
      await videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
      });

      setCameraError(null);
    }
  } catch (error) {
    console.error("Error accessing camera:", error);
    setCameraError("Camera access denied. Please allow camera permissions to continue with the test.");
  }
};

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };
  

//------------------------------->
const fetchQuestions = async (selectedLanguage, selectedLevel) => {
  console.log("Fetching questions for:", selectedLanguage, selectedLevel);
  try {
    const response = await fetch("http://localhost:5000/api/getquestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: selectedLanguage.toLowerCase(),
        level: selectedLevel.toLowerCase(),
      }),
    });

    const data = await response.json();

    if (response.ok && Array.isArray(data.questions) && data.questions.length > 0) {
      const questionsWithIds = data.questions.map((q) => ({
        ...q,
        id: q._id || q.id, // normalize ID if needed
      }));
      console.log("questions:",questionsWithIds);
       questionsWithIds.forEach(function(q) {
        q['selectedAnswer']='';
   });
   console.log("updated questions:",questionsWithIds);
      setQuestions(questionsWithIds);
    } else {
      alert(data.message || "No questions found for the given criteria");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    alert("Error fetching questions. Please try again.");
  }
};

const startTest = async () => {
  console.log("Selected language:", language);
  console.log("Selected level:", level);

  if (!language || !level) {
    alert("Please select a programming language and difficulty level first!");
    return;
  }

  try {
    await startCamera();
    await fetchQuestions(language, level); // fetch with IDs
    setIsTestStarted(true);
    setTimeLeft(60);
    goFullScreen();
  } catch (error) {
    console.error("Failed to start the test:", error);
    alert("Failed to start the test. Please try again.");
  }
};



  // Fullscreen request
  const goFullScreen = async () => {
    try {
      if (testContainerRef.current?.requestFullscreen) {
        await testContainerRef.current.requestFullscreen();
        setIsFullScreen(true);
        setFullScreenWarning(false);
      }
    } catch (err) {
      console.error("Error attempting fullscreen:", err);
    }
  };

  // Exit fullscreen
  const exitFullScreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error exiting fullscreen:", err);
    }
  };

  // Next question handler
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(60);
    } else {
      finishTest();
    }
  }, [currentQuestionIndex, questions.length, finishTest]);

  // Timer for questions
  useEffect(() => {
    if (isTestStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTestStarted) {
      nextQuestion();
    }
  }, [isTestStarted, timeLeft, nextQuestion]);

  // Answer selection
  const handleAnswerSelection = (answer,currentQuestionIndex) => {
    // if (selectedAnswer) return;
    console.log("handle answer");
    setSelectedAnswer(answer);
    console.log("current question:",questions[currentQuestionIndex]);
    console.log("selected ans:",answer);
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
      console.log(score);
    }
    else{
      console.log("wrong answer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!isTestStarted ? (
        // Selection and Instructions
        <div className="flex flex-col lg:flex-row h-screen">
          {/* Instructions Section */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="w-full max-w-2xl p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl">
              <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                Test Instructions
              </h2>
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">1</span>
                  <span>30 questions with 1 minute per question</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">2</span>
                  <span>Timer will auto-advance to next question</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">3</span>
                  <span>Test must be completed in fullscreen mode</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">4</span>
                  <span>Camera must remain on for monitoring</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Selection Section */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-900">
            <div className="w-full max-w-md">
              <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Programming Test
              </h1>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Choose a language</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Difficulty</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Choose difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <button
                  onClick={startTest}
                  disabled={!language || !level}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                    !language || !level
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30"
                  }`}
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : !testFinished ? (
        <div
          ref={testContainerRef}
          className="h-screen w-full flex flex-col lg:flex-row bg-gray-900"
          style={{ minHeight: "100vh" }}
        >
          {/* Fullscreen warning */}
          {fullScreenWarning && (
            <div className="absolute inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-6">
              <div className="max-w-md bg-red-900 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Warning!</h3>
                <p className="text-white mb-6">
                  You must complete the test in fullscreen mode. The test will automatically return to fullscreen.
                </p>
              </div>
            </div>
          )}

          {/* Test Content - takes majority width */}
          <div className="flex-1 p-6 overflow-y-auto max-w-full">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                    Question {currentQuestionIndex + 1}/{questions.length}
                  </div>
                  <div className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                    <FaClock className="mr-2" />
                    {timeLeft}s
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-blue-400">
                  {questions[currentQuestionIndex]?.question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestionIndex]?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelection(option,currentQuestionIndex)}
                      disabled={selectedAnswer}
                      className={`w-full text-left p-4 rounded-lg transition-all border-2 ${
                        selectedAnswer === option
                          ? option === questions[currentQuestionIndex]?.correctAnswer
                            ? "border-green-500 bg-green-900/30"
                            : "border-red-500 bg-red-900/30"
                          : selectedAnswer
                          ? "border-gray-700 bg-gray-700/50"
                          : "border-gray-700 bg-gray-800 hover:border-blue-500 hover:bg-gray-700/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {selectedAnswer === questions[currentQuestionIndex]?.correctAnswer && (
                    <FaCheckCircle className="text-green-500 text-3xl" />
                  )}
                  {selectedAnswer && selectedAnswer !== questions[currentQuestionIndex]?.correctAnswer && (
                    <FaTimesCircle className="text-red-500 text-3xl" />
                  )}
                </div>

                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold disabled:bg-gray-700"
                  disabled={!selectedAnswer}>
                  Next</button>
                <button
                 onClick={finishTest}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
                 >
                 Finish
                </button>
              </div>
            </div>
          </div>

          {/* Camera sidebar */}
          <div className="w-full lg:w-80 xl:w-96 bg-black p-4 flex flex-col items-center justify-center border-l border-gray-700">
            <h3 className="mb-4 text-center text-white text-lg font-semibold flex items-center justify-center space-x-2">
              <FaCamera /> <span>Monitoring Camera</span>
            </h3>
            {cameraError ? (
              <div className="text-red-500 px-2 text-center">{cameraError}</div>
            ) : (
              <video
  ref={videoRef}
  autoPlay
  muted
  playsInline
  className="w-full rounded-lg border border-gray-600 shadow-lg"
  style={{ aspectRatio: "4 / 3", objectFit: "cover", backgroundColor: "black" }}
/>
            )}
          </div>
        </div>
      ) : (
        // Test finished view
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 p-6">
          <h2 className="text-4xl font-bold text-blue-500 mb-6">Test Completed!</h2>
          <p className="text-lg mb-4">
            Your score:{" "}
            <span className="font-semibold text-green-400">
              {score} / {questions.length}
            </span>
          </p>
          <button
            onClick={() => {
              setIsTestStarted(false);
              setTestFinished(false);
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setScore(0);
              setTabSwitchCount(0);
              setCameraError(null);
              setFullScreenWarning(false);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Restart Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
