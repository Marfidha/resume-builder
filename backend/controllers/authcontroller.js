import User from "../models/user.js";
import { getAuth } from "@clerk/express";


export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    console.log(userId);
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let user = await User.findOne({ clerkId: userId });
    if (user) {
      return res.json({ message: "User already exists" });
    }
    user = await User.create({
      clerkId: userId,
      name: req.body.name || "",
      email: req.body.email || "",
      image: req.body.image || ""
    });
    res.json({ message: "User created", user });
  } catch (error) {
    console.error("SYNC ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({ message: error.message });
  }
};