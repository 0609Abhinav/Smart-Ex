import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollNumber: { type: String, required: true },
  branch: { type: String, required: true },
  course: { type: String, required: true },
  dob: { type: Date, required: true },
  year: { type: String, required: true },
  role: { type: String, enum: ["student", "proctor", "admin"], default: "student" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
