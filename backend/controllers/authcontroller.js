import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAuth } from "@clerk/express";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 🔍 check existing
    let user = await User.findOne({ clerkId: userId });

    if (user) {
      return res.json({ message: "User already exists" });
    }

    // ✅ create user
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