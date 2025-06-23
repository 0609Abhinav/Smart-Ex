// Importing required modules using ES module syntax
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Question from "./src/models/question.js";
import http from "http";
import { Server as SocketIo } from "socket.io";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import examRoutes from "./src/routes/examRoutes.js";
import proctorRoutes from "./src/routes/proctorRoutes.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";
import aiMiddleware from "./src/middlewares/aiMiddleware.js";
// import audioMiddleware from "./src/middlewares/audioMiddleware.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// custom code

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://abhinav:password456@testo.icvfb.mongodb.net/?retryWrites=true&w=majority&appName=testo";
console.log('connecting to database');
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
     await client.connect();
     // Send a ping to confirm a successful connection
     await client.db("test").command({ ping: 1 });
     var result = await client.db("test").collection('users');
    console.log(result);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);


// Load environment variables
dotenv.config();

// Initialize express app & HTTP server
const app = express();
const server = http.createServer(app);
const io = new SocketIo(server, {
  cors: { origin: process.env.CLIENT_URL || "*" },
});
app.use(cors());
// Connect to database
// connectDB()
//   .then(() => console.log("✅ Database connected successfully"))
//   .catch((err) => {
//     console.error("❌ Database connection error:", err);
//     process.exit(1); // Exit process on DB failure
//   });

// Middleware setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/proctor", proctorRoutes);

// AI Proctoring Route
app.use("/api/ai", authMiddleware, aiMiddleware, (req, res) => {
  res.json({ message: "AI Proctoring Active" });
});

// Audio Monitoring Route
app.use("/api/audio", authMiddleware, (req, res) => {
  res.json({ message: "Audio Monitoring Active" });
});


// app.use("/api/audio", authMiddleware, audioMiddleware, (req, res) => {
//   res.json({ message: "Audio Monitoring Active" });
// });
// WebSockets for real-time AI monitoring
io.on("connection", (socket) => {
  console.log("🟢 New Client Connected");

  socket.on("face-detection", (data) => {
    io.emit("face-alert", { message: "⚠️ Suspicious Activity Detected", data });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client Disconnected");
  });
});

// Default API route
app.get("/", (req, res) => {
  res.send("🎉 SmartEx API is running...");
});
const router = express.Router();
// POST: Add a new question
app.post("/api/questions", async (req, res) => {
  try {
    console.log("request",req);
    const { question, options,correctAnswer, explanation, level, language } = req.body;

    if (!question || options.length !== 4 || !explanation || !level || !language) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newQuestion = new Question({ question, options,correctAnswer, explanation, level, language });
    await newQuestion.save();

  return  res.status(201).json({ message: "Question added successfully", question: newQuestion });
    
  } catch (error) {
    console.error("error found: ",error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.use(express.json()); // make sure this is included at the top of your file
app.post("/api/validateuser", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received credentials:", { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    await client.connect();
    
    const cursor = client.db("test").collection("users").find({email:req.body.email});
    for await (const doc of cursor) {
      console.dir(doc);
      if(doc){
      return res.status(200).json({ message: "ok" });

      }
      else {
      return res.status(200).json({ message: "invalid user" });

      }
    }
  } catch (err) {
    console.error("Error connecting to database:", err);
    return res.status(500).json({ message: err });
  } finally {
    await client.close();
  }
});

//------------------------>
app.post("/api/getquestions", async (req, res) => {
  const { language, level } = req.body;
  if (!language || !level) {
    return res.status(400).json({ message: "Language and level are required" });
  }

  try {
    await client.connect();
    const questions = await client
      .db("testo")
      .collection("questions")
      .find({
        language: { $regex: `^${language.trim()}$`, $options: "i" },
        level: { $regex: `^${level.trim()}$`, $options: "i" }
      })
      .toArray();

    if (questions.length > 0) {
      return res.status(200).json({ message: "Questions fetched successfully", questions });
    } else {
      return res.status(404).json({ message: "No questions found for the given criteria" });
    }
  } catch (err) {
    console.error("Error fetching questions:", err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});
//coorect
const { ObjectId } = require("mongodb");

app.post("/api/submitanswers", async (req, res) => {
  const { answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: "Answers are required" });
  }

  try {
    await client.connect();
    const db = client.db("testo");
    const collection = db.collection("questions");

    let score = 0;
    const resultDetails = [];

    for (const { questionId, selectedOption } of answers) {
      const question = await collection.findOne({ _id: new ObjectId(questionId) });

      if (!question) {
        resultDetails.push({
          questionId,
          selectedOption,
          correctAnswer: null,
          isCorrect: false,
          error: "Question not found"
        });
        continue;
      }

      const isCorrect = selectedOption === question.answer;
      if (isCorrect) score++;

      resultDetails.push({
        questionId,
        selectedOption,
        correctAnswer: question.answer,
        isCorrect
      });
    }

    return res.status(200).json({
      message: "Score calculated successfully",
      score,
      total: answers.length,
      details: resultDetails
    });
  } catch (err) {
    console.error("Error submitting answers:", err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.get("/questions/last", async (req, res) => {
  try {
    const lastQuestion = await Question.findOne().sort({ qid: -1 });
    res.json(lastQuestion || {});
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});
// router.post("/questions", async (req, res) => {
//   const { qid, question, options, correctAnswer, explanation, level, language } = req.body;
//   try {
//     const newQuestion = new Question({ qid, question, options, correctAnswer, explanation, level, language });
//     await newQuestion.save();
//     res.status(201).json({ message: "Question added" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add question" });
//   }
// });
router.post("/api/questions", async (req, res) => {
  try {
    console.log("Received body:", req.body); // Yeh line zaroor honi chahiye

    const { qid, question, options, correctAnswer, explanation, level, language } = req.body;

    const newQuestion = new Question({
      qid,
      question,
      options,
      correctAnswer,
      explanation,
      level,
      language,
    });

    await newQuestion.save();

    res.status(201).json({ message: "✅ Question added" });
  } catch (err) {
    console.error("🔥 Error in POST /api/questions:", err); // Yeh error dikhayega kya issue hai
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

