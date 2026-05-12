import "dotenv/config";
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js"
import resumeRoutes from "./Routes/resumRoutes.js"
import uploadRoutes from "./Routes/uploadRoutes.js"
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(express.json());
connectDB()
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use("/api/users", authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/upload', uploadRoutes);
app.use(clerkMiddleware());

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});