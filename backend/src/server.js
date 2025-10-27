// server.js or app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import appRoutes from "./routes/appRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Connect MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Allow frontend access
app.use(
  cors({
    origin: "http://localhost:3000", // React app
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/images", appRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Backend API running. Use /api/images routes.");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
