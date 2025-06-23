import mongoose from "mongoose";

const authLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, enum: ["REGISTER", "LOGIN"], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("AuthLog", authLogSchema);
