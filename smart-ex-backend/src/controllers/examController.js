import Exam from "../models/Exam.js";

export const createExam = async (req, res) => {
  try {
    const { title, questions, duration } = req.body;
    const exam = new Exam({ title, questions, duration, createdBy: req.user.id });
    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("createdBy", "name");
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
