import History from "../models/History.js";
import auth from "../middleware/auth.js"; // your auth middleware

export const getMyHistory = async (req, res) => {
  try {
    // req.user is set by your auth middleware from the token
    const userId = req.user.id;

    // Fetch only history records belonging to this user
    const myHistory = await History.find({ user: userId })
      .populate("image") // populates the image reference with full details
      .sort({ createdAt: -1 }); // newest first

    res.json(myHistory);
  } catch (err) {
    console.error("GET MY HISTORY ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};