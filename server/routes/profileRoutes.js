import express from 'express';
import { Profile } from '../models/Profile.js';
import { AIMemory } from '../models/AIMemory.js';
import { ChatHistory } from '../models/ChatHistory.js';
import { HealthLog } from '../models/HealthLog.js';
import { RANJU_TIMELINE } from '../../src/data/ranjuData.js';
import { MANISH_TIMELINE } from '../../src/data/manishData.js';

const router = express.Router();

// Onboarding API: Accepts array of profiles
router.post('/onboard', async (req, res) => {
  try {
    const { profilesData } = req.body;

    if (!Array.isArray(profilesData) || profilesData.length === 0) {
      return res.status(400).json({ success: false, message: 'No profile data provided.' });
    }

    const createdProfiles = [];

    for (let i = 0; i < Math.min(5, profilesData.length); i++) {
      const p = profilesData[i];
      const isPrimary = p.relationship === 'primary' || i === 0;
      const pid = isPrimary ? 'primary_user' : `family_${p.relationship}_${Date.now()}_${i}`;

      const isHusband = (p.userName && p.userName.toLowerCase().includes('manish')) || p.relationship === 'husband';
      const avatar = isPrimary ? '🌿' : (isHusband ? '⚡' : p.relationship === 'wife' ? '🌸' : '⭐');

      const concernsArray = typeof p.healthConcerns === 'string' 
        ? p.healthConcerns.split(',').map(s => s.trim()).filter(Boolean)
        : (Array.isArray(p.healthConcerns) ? p.healthConcerns : []);

      const goalsArray = typeof p.healthGoals === 'string'
        ? p.healthGoals.split(',').map(s => s.trim()).filter(Boolean)
        : (Array.isArray(p.healthGoals) ? p.healthGoals : []);

      let focusNutrients = ['Protein', 'Fiber', 'Vitamin D', 'Vitamin B12', 'Zinc', 'Omega-3', 'Vitamin C'];
      if (concernsArray.some(c => c.toLowerCase().includes('hair') || c.toLowerCase().includes('skin'))) {
        focusNutrients = ['Protein', 'Iron', 'Vitamin D', 'Vitamin B12', 'Zinc', 'Omega-3', 'Vitamin C'];
      } else if (concernsArray.some(c => c.toLowerCase().includes('weight') || c.toLowerCase().includes('boil'))) {
        focusNutrients = ['Protein', 'Fiber', 'Healthy Fats', 'Metabolic Antioxidants'];
      }

      const doc = await Profile.findOneAndUpdate(
        { profileId: pid },
        {
          profileId: pid,
          relationship: p.relationship || (isPrimary ? 'primary' : 'family'),
          userName: p.userName || (isPrimary ? 'Primary User' : 'Family Member'),
          avatar,
          age: parseInt(p.age) || 30,
          gender: p.gender || '',
          heightCm: parseInt(p.heightCm) || 165,
          weightKg: parseInt(p.weightKg) || 60,
          targetWeightKg: parseInt(p.targetWeightKg) || 55,
          wakeTime: p.wakeTime || '7:30 AM',
          sleepTime: p.sleepTime || '10:45 PM',
          occupation: p.occupation || '',
          activityLevel: p.activityLevel || 'Moderate',
          exerciseDays: p.exerciseDays || '3-4 days a week',
          waterTargetMl: parseInt(p.waterTargetMl) || 2500,
          dietType: p.dietType || 'Non-vegetarian',
          allergies: p.allergies || 'None',
          usualFoods: p.usualFoods || '',
          beveragesHabit: p.beveragesHabit || 'Tea / Coffee',
          healthConcerns: concernsArray,
          medicalConditions: p.medicalConditions || '',
          medications: p.medications || '',
          limitations: p.limitations || '',
          healthGoals: goalsArray,
          targetAchievements: p.targetAchievements || '',
          remindersDesired: p.remindersDesired || 'Water, walks, meals, sleep',
          additionalNotes: p.additionalNotes || '',
          focusNutrients,
          streakDays: 7,
          yesterdayCompletionPct: 82
        },
        { upsert: true, new: true }
      );

      createdProfiles.push(doc);

      // Log initial memory note in MongoDB
      await AIMemory.create({
        profileId: pid,
        note: `Profile initialized for ${doc.userName} (${doc.relationship}). Goals: ${goalsArray.join(', ')}. Concerns: ${concernsArray.join(', ')}.`,
        category: 'conversation'
      });
    }

    return res.status(200).json({ success: true, profiles: createdProfiles });
  } catch (err) {
    console.error('MongoDB Dynamic Onboarding Error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// CRUD Profiles
router.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, profiles });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/profile/:profileId', async (req, res) => {
  try {
    const updated = await Profile.findOneAndUpdate(
      { profileId: req.params.profileId },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, profile: updated });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/profile/:profileId', async (req, res) => {
  try {
    await Profile.deleteOne({ profileId: req.params.profileId });
    await AIMemory.deleteMany({ profileId: req.params.profileId });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Chat History API
router.get('/chats/:profileId', async (req, res) => {
  try {
    const chats = await ChatHistory.find({ profileId: req.params.profileId }).sort({ createdAt: 1 });
    return res.status(200).json({ success: true, chats });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/chats', async (req, res) => {
  try {
    const { profileId, sender, text } = req.body;
    const msg = await ChatHistory.create({ profileId, sender, text });
    return res.status(200).json({ success: true, chat: msg });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Health Logs API (Health Timeline)
router.get('/healthlogs/:profileId', async (req, res) => {
  try {
    const logs = await HealthLog.find({ profileId: req.params.profileId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, logs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/healthlogs', async (req, res) => {
  try {
    const { profileId, logType, value, notes } = req.body;
    const log = await HealthLog.create({ profileId, logType, value, notes });
    return res.status(200).json({ success: true, log });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Memory Privacy CRUD API
router.delete('/memory/:memoryId', async (req, res) => {
  try {
    await AIMemory.findByIdAndDelete(req.params.memoryId);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/memory/clear/:profileId', async (req, res) => {
  try {
    await AIMemory.deleteMany({ profileId: req.params.profileId });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
