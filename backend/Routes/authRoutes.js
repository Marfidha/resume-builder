import express from "express"
import {syncUser } from "../controllers/authcontroller.js";
import {   requireAuth } from "@clerk/express";

const router = express.Router();

router.post("/sync", syncUser);

export default router;