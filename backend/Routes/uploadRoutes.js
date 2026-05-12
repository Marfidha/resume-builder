import express from 'express';
import multer from 'multer';
import { uploadResume } from '../controllers/uploadController.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/',requireAuth, upload.single('resume'), uploadResume);

export default router;
