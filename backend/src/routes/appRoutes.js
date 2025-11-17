// FILE: backend/src/routes/appRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { uploadImage, getResults } from "../controllers/imageController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// 🔥 Correct absolute upload directory:
// backend/uploads  (NOT backend/backend/uploads)
const uploadDir = path.join(process.cwd(), "uploads");

// 🔥 Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Created uploads folder at:", uploadDir);
}

// 🔥 Multer storage uses ONLY this folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadImage);
router.get("/results", getResults);

export default router;
