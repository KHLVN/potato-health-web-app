// File: middleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token"); // Or "Authorization: Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    
    // Add user's ID to the request object so other functions can use it
    req.user = decoded.user; // Assumes your JWT payload is { user: { id: '...' } }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;