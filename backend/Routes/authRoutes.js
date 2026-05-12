import express from "express"
import { registerUser, syncUser } from "../controllers/authcontroller.js";
import {   requireAuth } from "@clerk/express";


const router = express.Router();

router.post("/register", registerUser);
router.post("/sync", requireAuth, syncUser);

export default router;