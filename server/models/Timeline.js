import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  profileId: { type: String, required: true }, // 'ranju' | 'manish'
  date: { type: String, required: true }, // 'YYYY-MM-DD'
  items: [{
    id: String,
    time: String,
    title: String,
    description: String,
    why: String,
    completed: { type: Boolean, default: false },
    actionType: String,
    duration: String
  }]
}, { timestamps: true });

export const Timeline = mongoose.model('Timeline', timelineSchema);
