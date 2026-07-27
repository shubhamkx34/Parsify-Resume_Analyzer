import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"

export async function protectRoute(req, res, next) {
  // 1. Extract the token from headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found My friend!" });
  }

  try {
    // 2. Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user in DB and attach to req.user
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User no longer exists!" });
    }

    req.user = user; // Save user data inside req for the next function to use
    next(); // All checks passed! Move to the controller function
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token!!!" });
  }
}