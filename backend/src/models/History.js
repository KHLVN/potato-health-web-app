import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image", // must match your image model name
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // matches your User model
      required: true,
      index: true,
    },
    disease: { type: String }, // prediction label
    probability_score: { type: Number }, // 0..1
    meta: {
      originalFilename: { type: String },
      sourceUrl: { type: String }, // if remote image
      notes: { type: String },
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// useful index to query a user's history newest-first
historySchema.index({ user: 1, createdAt: -1 });

const History = mongoose.model("History", historySchema);

export default History;