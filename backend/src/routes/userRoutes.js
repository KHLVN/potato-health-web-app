import express from "express";
import {
  loginUser,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import { getMyHistory } from "../controllers/imageController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);

router.get("/", getUsers);

// HISTORY route
router.get("/my-history", auth, getMyHistory);

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
