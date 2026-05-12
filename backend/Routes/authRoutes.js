import express from "express"
import { registerUser, syncUser } from "../controllers/authcontroller.js";
import {  clerkMiddleware } from "@clerk/express";


const router = express.Router();

router.post("/register", registerUser);
router.post("/sync", clerkMiddleware(), syncUser);

export default router;