import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  answers: [
    {
      question: String,
      selectedOption: String,
      correct: Boolean,
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Result", resultSchema);
