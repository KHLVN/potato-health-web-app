import express from "express";
import { getMyHistory } from "../controllers/historyController.js";
import auth from "../middleware/auth.js"; // your auth middleware

const router = express.Router();

// Protected route - only authenticated users
router.get("/my-history", auth, getMyHistory);

export default router;