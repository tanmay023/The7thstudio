import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    base64: { type: String, required: true },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;  // ✅ Default export
