// import Image from "../models/Image.js";
// import ClassificationResult from "../models/ClassificationResult.js";
// import fs from "fs";
// import axios from "axios";
// import FormData from "form-data";

// // Upload & classify image using Flask model
// export async function uploadImage(req, res) {
//   try {
//     if (!req.file)
//       return res.status(400).json({ message: "No image uploaded." });

//     // Save image to DB
//     const newImage = new Image({
//       filename: req.file.filename,
//       path: req.file.path,
//       mimetype: req.file.mimetype,
//     });
//     const savedImage = await newImage.save();

//     // Send image to Flask model for prediction
//     const formData = new FormData();
//     formData.append("file", fs.createReadStream(savedImage.path));

//     // ✅ Dynamically load Flask URL from .env
//     const flaskUrl = process.env.FLASK_API_URL || "http://127.0.0.1:5001";

//     const flaskResponse = await axios.post(`${flaskUrl}/predict`, formData, {
//       headers: formData.getHeaders(),
//     });

//     const { prediction, confidence } = flaskResponse.data;
//     const predictedLabel = prediction.toLowerCase();

//     // Save result to DB
//     const result = new ClassificationResult({
//       image: savedImage._id,
//       disease: predictedLabel,
//       probability_score: confidence,
//     });
//     await result.save();

//     // Return result
//     res.status(201).json({
//       imageId: savedImage._id,
//       filename: savedImage.filename,
//       disease: predictedLabel,
//       probability_score: confidence,
//     });
//   } catch (err) {
//     console.error("UPLOAD ERROR:", err.message);
//     res.status(500).json({ error: "Image upload failed" });
//   }
// }

// // Get all classification results with linked images
// export async function getResults(req, res) {
//   try {
//     const results = await ClassificationResult.find()
//       .populate("image")
//       .sort({ createdAt: -1 });
//     res.json(results);
//   } catch (err) {
//     console.error("FETCH ERROR:", err.message);
//     res.status(500).json({ error: "Failed to fetch results" });
//   }
// }

// File: controllers/imageController.js
import Image from "../models/Image.js";
import ClassificationResult from "../models/ClassificationResult.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

// Upload & classify image using Flask model
export async function uploadImage(req, res) {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded." });

    // --- 1. GET USER ID FROM MIDDLEWARE ---
    const userId = req.user.id; 

    // Save image to DB
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      user: userId // <-- 2. LINK THE USER
    });
    const savedImage = await newImage.save();

    // ... (your Flask API call logic is perfect, no change needed)
    const formData = new FormData();
    formData.append("file", fs.createReadStream(savedImage.path));
    const flaskUrl = process.env.FLASK_API_URL || "http://localhost:5001";
    const flaskResponse = await axios.post(`${flaskUrl}/predict`, formData, {
      headers: formData.getHeaders(),
    });

    const { prediction, confidence } = flaskResponse.data;
    const predictedLabel = prediction.toLowerCase();

    // Save result to DB
    const result = new ClassificationResult({
      image: savedImage._id,
      disease: predictedLabel,
      probability_score: confidence,
      user: userId // <-- 3. LINK THE USER HERE TOO
    });
    await result.save();

    // Return result
    res.status(201).json({
      imageId: savedImage._id,
      filename: savedImage.filename,
      disease: predictedLabel,
      probability_score: confidence,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err.message);
    res.status(500).json({ error: "Image upload failed" });
  }
}

// --- 4. ADD THIS NEW FUNCTION FOR THE HISTORY PAGE ---
export async function getMyHistory(req, res) {
  try {
    // Find results where the 'user' field matches the ID of the
    // user making the request (from the auth token).
    const results = await ClassificationResult.find({ user: req.user.id })
      .populate("image") // This links to the image details (like 'path')
      .sort({ createdAt: -1 }); // Newest first

    res.json(results);
  } catch (err) {
    console.error("FETCH HISTORY ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}
// ----------------------------------------------------

// Get all classification results (for guests)
// This function is unchanged.
export async function getResults(req, res) {
  try {
    const results = await ClassificationResult.find()
      .populate("image")
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("FETCH ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch results" });
  }
}