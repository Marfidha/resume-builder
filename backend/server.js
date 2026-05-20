import "dotenv/config";
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js"
import resumeRoutes from "./Routes/resumRoutes.js"
import uploadRoutes from "./Routes/uploadRoutes.js"
import { clerkMiddleware } from "@clerk/express";

const app = express();
connectDB()
const port = process.env.PORT || 5000;

app.use(clerkMiddleware());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use("/api/users", authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/upload', uploadRoutes);
app.get("/", (req, res) => {
  res.json("backend is running");
});
app.listen(port, () => {
  console.log(`Server running on port${port}`);
});