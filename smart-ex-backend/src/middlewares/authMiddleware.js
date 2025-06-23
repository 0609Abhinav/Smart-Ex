import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Extract Token
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access Denied. No Token Provided" });
    }

    // Get Token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify and Decode Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Session expired. Please log in again." });
      }
      return res.status(401).json({ error: "Invalid Token" });
    }

    // Find user in database (excluding password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user; // Attach user data to request
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authMiddleware;
