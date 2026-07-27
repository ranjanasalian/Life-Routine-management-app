import express from 'express';
import { Profile } from '../models/Profile.js';
import { AIMemory } from '../models/AIMemory.js';
import { Timeline } from '../models/Timeline.js';
import { RANJU_TIMELINE } from '../../src/data/ranjuData.js';
import { MANISH_TIMELINE } from '../../src/data/manishData.js';

const router = express.Router();

// Onboarding API: Saves Ranju & Manish profiles to MongoDB
router.post('/onboard', async (req, res) => {
  try {
    const { ranjuData, manishData } = req.body;

    // Ranju Profile
    const ranjuProfile = await Profile.findOneAndUpdate(
      { profileId: 'ranju' },
      {
        profileId: 'ranju',
        userName: 'Ranju',
        avatar: '🌿',
        age: ranjuData?.age || 30,
        heightCm: ranjuData?.heightCm || 165,
        weightKg: ranjuData?.weightKg || 60,
        targetWeightKg: ranjuData?.targetWeightKg || 54,
        wakeTime: ranjuData?.wakeTime || '7:30 AM',
        sleepTime: ranjuData?.sleepTime || '10:45 PM',
        waterTargetMl: 2500,
        healthConcerns: ranjuData?.healthConcerns || ['severe hair fall', 'dull skin', 'sleep late'],
        healthGoals: ['hair recovery', 'glowing skin', 'fitness', 'energy'],
        focusNutrients: ['Protein', 'Iron', 'Vitamin D', 'Vitamin B12', 'Zinc', 'Omega-3', 'Vitamin C']
      },
      { upsert: true, new: true }
    );

    // Manish Profile
    const manishProfile = await Profile.findOneAndUpdate(
      { profileId: 'manish' },
      {
        profileId: 'manish',
        userName: 'Manish',
        avatar: '⚡',
        age: manishData?.age || 34,
        heightCm: manishData?.heightCm || 178,
        weightKg: manishData?.weightKg || 95,
        targetWeightKg: manishData?.targetWeightKg || 80,
        wakeTime: manishData?.wakeTime || '7:15 AM',
        sleepTime: manishData?.sleepTime || '10:15 PM',
        waterTargetMl: 3000,
        healthConcerns: manishData?.healthConcerns || ['recurring painful boils', 'dust allergy', 'frequent sneezing', 'sedentary', 'sleep late'],
        healthGoals: ['weight loss (95kg to 80kg)', 'boil reduction', '8,000 steps daily', 'better eating'],
        focusNutrients: ['Protein', 'Fiber', 'Healthy Fats', 'Metabolic Antioxidants']
      },
      { upsert: true, new: true }
    );

    // Log permanent memory in MongoDB
    await AIMemory.create([
      { profileId: 'ranju', note: 'Initial AI Interview Completed. Concerns logged: severe hair fall, dull skin, low hydration.', category: 'conversation' },
      { profileId: 'manish', note: 'Initial AI Interview Completed. Concerns logged: 95kg weight, recurring painful boils, dust allergy & sneezing.', category: 'conversation' }
    ]);

    return res.status(200).json({ success: true, ranju: ranjuProfile, manish: manishProfile });
  } catch (err) {
    console.error('MongoDB Onboarding API Error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Fetch Profile from MongoDB
router.get('/profile/:profileId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ profileId: req.params.profileId });
    return res.status(200).json({ success: true, profile });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Fetch Permanent Memory Logs from MongoDB
router.get('/memory/:profileId', async (req, res) => {
  try {
    const memories = await AIMemory.find({ profileId: req.params.profileId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, memories });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Create new Permanent Memory Log in MongoDB
router.post('/memory', async (req, res) => {
  try {
    const { profileId, note, category, patternDetected } = req.body;
    const memory = await AIMemory.create({
      profileId: profileId || 'ranju',
      note,
      category: category || 'symptom',
      patternDetected: patternDetected || null
    });
    return res.status(200).json({ success: true, memory });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
