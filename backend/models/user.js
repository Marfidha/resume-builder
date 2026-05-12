import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true // 🔥 prevents duplicate users
  },
  name: String,
  email: String,
  image: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);