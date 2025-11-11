// import mongoose from "mongoose";

// const classificationResultSchema = new mongoose.Schema(
//     {
//         image: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
//         disease: { type: String, enum: ['fungal', 'bacterial', 'healthy'], default: 'healthy' },
//         probability_score: { type: Number, required: true },        // e.g., 0.85 for 85%
//         confidence: { type: Number }
//     }, 
//     { timestamps: true }); // adds createdAt & updatedAt automatically

// const ClassificationResult = mongoose.model("ClassificationResult", classificationResultSchema)

// export default ClassificationResult;

import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
            required: true
        },
        disease: { type: String },
        probability_score: { type: Number },

        // --- ADD THIS LINE ---
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const ClassificationResult = mongoose.model("ClassificationResult", resultSchema);
export default ClassificationResult;

