import Result from "../models/Result.js";
import Exam from "../models/Exam.js";

export const submitResult = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Calculate score
    let score = 0;
    const processedAnswers = exam.questions.map((q, index) => {
      const correct = q.correctAnswer === answers[index];
      if (correct) score += 1;
      return {
        question: q.question,
        selectedOption: answers[index],
        correct,
      };
    });

    const result = new Result({
      exam: examId,
      student: req.user.id,
      score,
      answers: processedAnswers,
    });
    await result.save();

    res.status(201).json({ message: "Result submitted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id })
      .populate("exam", "title")
      .sort({ submittedAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
