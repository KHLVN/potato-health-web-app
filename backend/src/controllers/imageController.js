import Image from "../models/Image.js";
import ClassificationResult from "../models/ClassificationResult.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

// Upload & classify image using Flask model
export async function uploadImage(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded." });

    // Save image to DB
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
    });
    const savedImage = await newImage.save();

    // Send image to Flask model for prediction
    const formData = new FormData();
    formData.append("file", fs.createReadStream(savedImage.path));

    const flaskResponse = await axios.post("http://127.0.0.1:2000/predict", formData, {
      headers: formData.getHeaders(),
    });

    const { prediction, confidence } = flaskResponse.data;
    const predictedLabel = prediction.toLowerCase();

    // Save result to DB
    const result = new ClassificationResult({
      image: savedImage._id,
      disease: predictedLabel,
      probability_score: confidence,
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

// Get all classification results with linked images
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
