import express from "express";
import { loginUser } from "../controllers/userController";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", createUser);

module.exports = router;