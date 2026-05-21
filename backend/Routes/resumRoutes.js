import express from 'express';
import Resume from '../models/resume.js';
import { getAuth } from '@clerk/express';

const router = express.Router();

router.post('/', async (req, res) => {

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  try {

    const resume = await Resume.findOneAndUpdate(
      { userId },
      { ...req.body, userId },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json(resume);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});

router.get('/me', async (req, res) => {
  const { userId } = getAuth(req);

if (!userId) {
  return res.status(401).json({
    message: "Unauthorized"
  });
}
  try {
    const resume = await Resume.findOne({ userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
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



// CREATE / UPDATE RESUME
// router.post('/', async (req, res) => {
//   try {

//     const resume = await Resume.findOneAndUpdate(
//       { userId },
//       { ...req.body, userId },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     res.status(200).json(resume);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// GET MY RESUME
// router.get('/me', async (req, res) => {
//   try {

//     const { userId } = getAuth(req);

//     const resume = await Resume.findOne({ userId });

//     if (!resume) {
//       return res.status(404).json({
//         message: 'Resume not found'
//       });
//     }

//     res.json(resume);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// GET RESUME BY ID
// router.get('/:id', async (req, res) => {
//   try {

//     const resume = await Resume.findById(req.params.id);

//     if (!resume) {
//       return res.status(404).json({
//         message: 'Resume not found'
//       });
//     }

//     res.json(resume);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;