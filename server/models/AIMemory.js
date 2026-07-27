import mongoose from 'mongoose';

const aiMemorySchema = new mongoose.Schema({
  profileId: { type: String, required: true }, // 'ranju' | 'manish' | 'couple'
  note: { type: String, required: true },
  category: { type: String, enum: ['symptom', 'habit', 'pattern', 'observation', 'conversation'], default: 'note' },
  patternDetected: { type: String, default: null },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export const AIMemory = mongoose.model('AIMemory', aiMemorySchema);
