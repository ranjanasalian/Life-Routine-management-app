import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  profileId: { type: String, required: true, unique: true },
  relationship: { type: String, default: 'primary' }, // 'primary' | 'husband' | 'wife' | 'child' | 'parent' | 'friend' | 'other'
  userName: { type: String, required: true },
  avatar: { type: String, default: '🌿' },
  age: { type: Number, default: 30 },
  gender: { type: String, default: '' },
  heightCm: { type: Number, default: 165 },
  weightKg: { type: Number, default: 60 },
  targetWeightKg: { type: Number, default: 55 },
  wakeTime: { type: String, default: '7:30 AM' },
  sleepTime: { type: String, default: '10:45 PM' },
  occupation: { type: String, default: '' },
  activityLevel: { type: String, default: 'Moderate' },
  exerciseDays: { type: String, default: '3-4 days a week' },
  waterTargetMl: { type: Number, default: 2500 },
  dietType: { type: String, default: 'Non-vegetarian' }, // 'Vegetarian' | 'Non-vegetarian' | 'Eggetarian'
  allergies: { type: String, default: 'None' },
  usualFoods: { type: String, default: '' },
  beveragesHabit: { type: String, default: 'Tea / Coffee' },
  healthConcerns: [{ type: String }],
  medicalConditions: { type: String, default: '' },
  medications: { type: String, default: '' },
  limitations: { type: String, default: '' },
  healthGoals: [{ type: String }],
  targetAchievements: { type: String, default: '' },
  remindersDesired: { type: String, default: 'Water, walks, meals, sleep' },
  additionalNotes: { type: String, default: '' },
  focusNutrients: [{ type: String }],
  streakDays: { type: Number, default: 7 },
  yesterdayCompletionPct: { type: Number, default: 82 }
}, { timestamps: true });

export const Profile = mongoose.model('Profile', profileSchema);
