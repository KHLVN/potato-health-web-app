import express from "express";
import {
  loginUser,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// ✅ User routes
router.post("/login", loginUser);
router.post("/register", createUser);  // Changed from /signup to /register
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
