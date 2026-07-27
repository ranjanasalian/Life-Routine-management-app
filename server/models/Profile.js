import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  profileId: { type: String, required: true, unique: true }, // 'ranju' | 'manish'
  userName: { type: String, required: true },
  avatar: { type: String, default: '🌿' },
  age: { type: Number, default: 30 },
  heightCm: { type: Number, default: 165 },
  weightKg: { type: Number, default: 60 },
  targetWeightKg: { type: Number, default: 55 },
  wakeTime: { type: String, default: '7:00 AM' },
  sleepTime: { type: String, default: '10:30 PM' },
  waterTargetMl: { type: Number, default: 2500 },
  exerciseHabits: { type: String, default: 'Light yoga and daily walking' },
  healthConcerns: [{ type: String }], // e.g. ["severe hair fall", "dull skin", "sleep late"] or ["95 kg weight", "painful boils", "dust allergy"]
  healthGoals: [{ type: String }],
  focusNutrients: [{ type: String }],
  streakDays: { type: Number, default: 7 },
  yesterdayCompletionPct: { type: Number, default: 82 }
}, { timestamps: true });

export const Profile = mongoose.model('Profile', profileSchema);
