import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const mongoDB =
  process.env.MONGO_URI ||
  "mongodb+srv://abhinav:password456@testo.icvfb.mongodb.net/?retryWrites=true&w=majority&appName=testo";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// Define the Question Schema
const questionSchema = new mongoose.Schema(
  {
    qid: { type: Number, unique: true, required: false }, // Backend will generate this
    question: { type: String, required: true, trim: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 2;
        },
        message: "At least 2 options are required",
      },
    },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true, trim: true },
    level: { type: String, required: true, enum: ["easy", "medium", "hard"] },
    language: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Pre-save hook to auto-increment qid
questionSchema.pre("save", async function (next) {
  if (this.qid != null) return next(); // Skip if already set

  const Model = mongoose.model("Question", questionSchema);
  const last = await Model.findOne().sort({ qid: -1 }).lean();
  this.qid = last ? last.qid + 1 : 1;
  next();
});

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
