import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// REGISTER USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("CREATE USER ERROR:", err);
    res.status(400).json({ error: "Registration failed" });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// GET ONE USER
export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// UPDATE
export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-password");

  if (!updated)
    return res.status(404).json({ message: "User not found" });

  res.json(updated);
};

// DELETE
export const deleteUser = async (req, res) => {
<<<<<<< HEAD
  const deleted = await User.findByIdAndDelete(req.params.id);

  if (!deleted)
    return res.status(404).json({ message: "User not found" });

  res.json({ message: "User deleted successfully" });
};
=======
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("DELETE USER ERROR:", err.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
>>>>>>> ccd72bf (updated all modified changes)
