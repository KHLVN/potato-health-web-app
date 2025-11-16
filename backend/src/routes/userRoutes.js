import express from "express";
import mongoose from "mongoose";
import {
  loginUser,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { getMyHistory } from "../controllers/historyController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not found" });
  }
  next();
};

// ✅ User routes
router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/", getUsers);

// protected route (must be BEFORE the param route)
router.get("/my-history", auth, getMyHistory);

// param routes — validate ObjectId with middleware instead of inline regex
router.get("/:id", validateObjectId, getUser);
router.put("/:id", validateObjectId, updateUser);
router.delete("/:id", validateObjectId, deleteUser);

export default router;
