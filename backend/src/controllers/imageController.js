import Image from "../models/Image.js";
import ClassificationResult from "../models/ClassificationResult.js";

// Upload & Classify Image
export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    // Save image in DB
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
    });
    const savedImage = await newImage.save();

    // Mock classification (replace with ML model later)
    const mockResult = {
      disease: "bacterial",   // enum: healthy | fungal | bacterial
      confidence: 1.00,     // probability_score
      filePath: savedImage.path,
    };

    // Save classification result 
    const result = new ClassificationResult({
      image: savedImage._id,
      disease: mockResult.disease,
      probability_score: mockResult.confidence,
    });
    await result.save();

    // Respond with classification + image reference
    res.status(201).json({
      imageId: savedImage._id,
      filename: savedImage.filename,
      disease: result.disease,
      probability_score: result.probability_score,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err.message, err);
    res.status(500).json({ error: "Image upload failed" });
  }
}

// Get all classification results
export async function getResults(req, res) {
  try {
    const results = await ClassificationResult.find()
      .populate("image")
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
}
