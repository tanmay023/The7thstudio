// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Media from "./models/Media.js";  // ✅ Import the default export


const app = express();
const PORT = 5000;

// ✅ Middleware with Increased Request Size Limit
app.use(cors());
app.use(express.json({ limit: "50mb" }));  // ✅ Increased limit for large file uploads
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/MY_FIRM")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ Database connection error:", err));

// -----------------------------
// 📩 Contact Messages Schema
// -----------------------------
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

// ✅ Fetch all messages
app.get("/contactMessages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages. Please try again later." });
  }
});

// ✅ Submit a new message
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new Message({ name, email, phone, message });
    await newMessage.save();

    res.status(201).json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error submitting message:", error);
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

// ✅ Delete a message
app.delete("/contactMessages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found." });
    }

    res.json({ message: "✅ Message deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message. Please try again later." });
  }
});

// -----------------------------
// 📷 Media Upload Schema
// -----------------------------
app.post("/uploadMedia", async (req, res) => {
  try {
    const { type, base64 } = req.body;

    if (!type || !base64) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMedia = new Media({ type, base64 });
    await newMedia.save();

    res.status(201).json({ message: "✅ Media uploaded successfully!" });
  } catch (error) {
    console.error("❌ Error uploading media:", error);
    res.status(500).json({ error: "Failed to upload media. Please try again later." });
  }
});

// ✅ Fetch all images & videos
app.get("/getMedia", async (req, res) => {
    try {
      const mediaFiles = await Media.find().sort({ createdAt: -1 });
  
      console.log("🔍 Media from DB:", mediaFiles);  // ✅ Log DB response
  
      res.json({ success: true, media: mediaFiles });  // ✅ Ensure correct JSON format
    } catch (error) {
      console.error("❌ Error fetching media:", error);
      res.status(500).json({ success: false, error: "Failed to fetch media." });
    }
  });
  
  
  

// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server running at: http://localhost:${PORT}`));
