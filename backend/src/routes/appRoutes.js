import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadImage, getResults } from "../controllers/imageController.js";

const router = express.Router();

// ✅ Correct path: backend/uploads
const uploadDir = path.resolve("uploads");

// 🛠️ Auto-create uploads folder if missing
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created uploads folder automatically");
}

// ✅ Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // directly point to backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post(
  "/upload",
  upload.single("image"),
  (req, res, next) => {
    console.log("📸 Multer parsed:", req.file);
    next();
  },
  uploadImage
);

router.get("/results", getResults);

export default router;
