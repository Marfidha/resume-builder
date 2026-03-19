import express from 'express';
import Resume from '../models/resume.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;