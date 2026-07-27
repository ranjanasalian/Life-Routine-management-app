import express from 'express';
import { Profile } from '../models/Profile.js';
import { AIMemory } from '../models/AIMemory.js';
import { Timeline } from '../models/Timeline.js';
import { RANJU_TIMELINE } from '../../src/data/ranjuData.js';
import { MANISH_TIMELINE } from '../../src/data/manishData.js';

const router = express.Router();

// Dynamic Onboarding API: Accepts array of profiles (Primary User + optional Family Members)
router.post('/onboard', async (req, res) => {
  try {
    const { profilesData } = req.body;

    if (!Array.isArray(profilesData) || profilesData.length === 0) {
      return res.status(400).json({ success: false, message: 'No profile data provided.' });
    }

    const createdProfiles = [];

    for (let i = 0; i < profilesData.length; i++) {
      const p = profilesData[i];
      const isPrimary = p.relationship === 'primary' || i === 0;
      const pid = isPrimary ? 'primary_user' : `family_${p.relationship}_${Date.now()}`;

      const avatar = isPrimary ? '🌿' : (p.relationship === 'husband' ? '⚡' : p.relationship === 'wife' ? '🌸' : '⭐');

      // Parse health concerns into array
      const concernsArray = typeof p.healthConcerns === 'string' 
        ? p.healthConcerns.split(',').map(s => s.trim()).filter(Boolean)
        : (Array.isArray(p.healthConcerns) ? p.healthConcerns : []);

      const goalsArray = typeof p.healthGoals === 'string'
        ? p.healthGoals.split(',').map(s => s.trim()).filter(Boolean)
        : (Array.isArray(p.healthGoals) ? p.healthGoals : []);

      // Nutrient focus logic
      let focusNutrients = ['Protein', 'Fiber', 'Vitamin D', 'Vitamin B12', 'Zinc', 'Omega-3', 'Vitamin C'];
      if (concernsArray.some(c => c.toLowerCase().includes('hair') || c.toLowerCase().includes('skin'))) {
        focusNutrients = ['Protein', 'Iron', 'Vitamin D', 'Vitamin B12', 'Zinc', 'Omega-3', 'Vitamin C'];
      } else if (concernsArray.some(c => c.toLowerCase().includes('weight') || c.toLowerCase().includes('fat') || c.toLowerCase().includes('boil'))) {
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

      // Log permanent memory note in MongoDB
      await AIMemory.create({
        profileId: pid,
        note: `Onboarding completed for ${doc.userName} (${doc.relationship}). Concerns logged: ${concernsArray.join(', ') || 'General health & routine'}. Goals: ${goalsArray.join(', ') || 'Overall fitness'}. Notes: ${doc.additionalNotes || 'None'}.`,
        category: 'conversation'
      });
    }

    return res.status(200).json({ success: true, profiles: createdProfiles });
  } catch (err) {
    console.error('MongoDB Dynamic Onboarding Error', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Update Profile API
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

// Get all profiles
router.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, profiles });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
