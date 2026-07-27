import mongoose from 'mongoose';

const healthLogSchema = new mongoose.Schema({
  profileId: { type: String, required: true },
  logType: { 
    type: String, 
    enum: ['weight', 'water', 'sleep', 'walk', 'hair_fall', 'skin_glow', 'boils', 'mood', 'achievement'], 
    required: true 
  },
  value: { type: String, required: true },
  notes: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export const HealthLog = mongoose.model('HealthLog', healthLogSchema);
