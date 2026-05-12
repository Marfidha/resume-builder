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

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_PROD
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(clerkMiddleware());
app.use(express.json());

app.use("/api/users", authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/upload', uploadRoutes);
app.use(clerkMiddleware());

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});