import Image from "../models/Image.js";
import ClassificationResult from "../models/ClassificationResult.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import jwt from "jsonwebtoken";

// ----------------------------------------
// UPLOAD IMAGE + CLASSIFY (Guest Allowed)
// ----------------------------------------
export async function uploadImage(req, res) {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded." });

    let userId = null;

    // OPTIONAL TOKEN (logged-in users only)
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;     // logged-in user
      } catch (error) {
        console.log("Guest mode: skipping token validation");
      }
    }

    // ----------------------------
    // SAVE IMAGE (guest or user)
    // ----------------------------
    const newImage = new Image({
      filename: req.file.filename,
      path: `uploads/${req.file.filename}`,
      mimetype: req.file.mimetype,
      user: userId || null,     // null for guest
    });

    const savedImage = await newImage.save();

    // ----------------------------
    // SEND TO FLASK API
    // ----------------------------
    const formData = new FormData();
    formData.append("file", fs.createReadStream(savedImage.path));

    const flaskUrl = process.env.FLASK_API_URL || "http://127.0.0.1:2000";

    const flaskResponse = await axios.post(
      `${flaskUrl}/predict`,
      formData,
      { headers: formData.getHeaders() }
    );

    const { prediction, confidence } = flaskResponse.data;
    const predictedLabel = prediction.toLowerCase();

    // ----------------------------
    // SAVE HISTORY ONLY FOR LOGGED USERS
    // ----------------------------
    if (userId) {
      const result = new ClassificationResult({
        image: savedImage._id,
        disease: predictedLabel,
        probability_score: confidence,
        user: userId,
      });

      await result.save();
    }

    // ----------------------------
    // SEND FRONTEND RESPONSE
    // ----------------------------
    res.status(201).json({
      imageId: savedImage._id,
      filename: savedImage.filename,
      disease: predictedLabel,
      probability_score: confidence,
      isGuest: !userId,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err.message);
    res.status(500).json({ error: "Image upload failed" });
  }
}

// ----------------------------------------
// GET HISTORY (Requires Authentication)
// ----------------------------------------
export async function getMyHistory(req, res) {
  try {
    const results = await ClassificationResult.find({ user: req.user.id })
      .populate("image")
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error("FETCH HISTORY ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}

// ----------------------------------------
// PUBLIC: GET ALL RESULTS
// ----------------------------------------
export async function getResults(req, res) {
  const results = await ClassificationResult.find()
    .populate("image")
    .sort({ createdAt: -1 });

  res.json(results);
}
