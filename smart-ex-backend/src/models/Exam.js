import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  duration: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Exam", examSchema);
