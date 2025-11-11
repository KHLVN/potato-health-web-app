// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { uploadImage, getResults } from "../controllers/imageController.js";

// const router = express.Router();

// // ✅ Correct path: backend/uploads
// const uploadDir = path.resolve("uploads");

// // 🛠️ Auto-create uploads folder if missing
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log("✅ Created uploads folder automatically");
// }

// // ✅ Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); // directly point to backend/uploads
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // ✅ Routes
// router.post(
//   "/upload",
//   upload.single("image"),
//   (req, res, next) => {
//     console.log("📸 Multer parsed:", req.file);
//     next();
//   },
//   uploadImage
// );

// router.get("/results", getResults);

// export default router;

// File: routes/appRoutes.js
import express from "express";
import multer from "multer";
// ... (other imports)
import { 
  uploadImage, 
  getResults, 
  getMyHistory // <-- Import the new function
} from "../controllers/imageController.js";
import authMiddleware from "../middleware/auth.js"; // <-- Import the middleware

const router = express.Router();

// ... (your multer storage setup) ...
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
  authMiddleware, // <-- PROTECT THIS ROUTE
  upload.single("image"),
  (req, res, next) => {
    // req.user is now available thanks to authMiddleware
    console.log("📸 Multer parsed:", req.file);
    console.log("👤 User identified:", req.user.id); 
    next();
  },
  uploadImage
);

// --- ADD THIS NEW ROUTE FOR THE HISTORY PAGE ---
router.get("/my-history", authMiddleware, getMyHistory);
// ----------------------------------------------

// This route can remain public for guests
router.get("/results", getResults);

export default router;