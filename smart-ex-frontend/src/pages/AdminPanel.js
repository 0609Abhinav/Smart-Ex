import { useState } from "react";
import { Card, CardContent } from "../components/card-ui/card";
import { Button } from "../components/card-ui/button";

export default function AdminPanel() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const payload = {
      question,
      options,
      correctAnswer,
      explanation,
      level,
      language,
    };

    console.log("Submitting:", payload);

    try {
      const response = await fetch("http://localhost:5000/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Question successfully added to database");

        // Reset form
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer("");
        setExplanation("");
        setLevel("");
        setLanguage("");
      } else {
        const errorData = await response.json();
        console.error("Failed to add question:", errorData.message);
      }
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex items-center justify-center">
      <Card className="w-full shadow-2xl rounded-xl border border-gray-200 bg-white p-8">
        <CardContent className="space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center">Admin Panel - Add Question</h2>

          <div className="space-y-6">
            <div>
              <label className="text-gray-700 font-medium block mb-2">Question</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Enter question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="text-gray-700 font-medium block mb-2">Options</label>
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              ))}
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-2">Correct Answer</label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                <option value="">Select Correct Answer</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-2">Explanation</label>
              <textarea
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Enter explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-2">Difficulty Level</label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">Select Difficulty Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-2">Programming Language</label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Select Programming Language</option>
                <option value="python">Python</option>
                <option value="c">C</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
                <option value="c++">C++</option>
                <option value="go">Go</option>
                <option value="ruby">Ruby</option>
                <option value="swift">Swift</option>
                <option value="php">PHP</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
