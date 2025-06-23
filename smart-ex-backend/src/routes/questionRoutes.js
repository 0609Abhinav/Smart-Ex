import express from "express";
import Question from "../models/question.js";

const router = express.Router();

// Route to add a new question
router.post("/", async (req, res) => {
  try {
    const { question, options, correctAnswer, explanation, level, language } = req.body;

    if (!question || !options || !correctAnswer || !explanation || !level || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ message: "Correct answer must be one of the options" });
    }

    const newQuestion = new Question({ question, options, correctAnswer, explanation, level, language });
    await newQuestion.save();
    
    res.status(201).json({ message: "Question added successfully", question: newQuestion });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
