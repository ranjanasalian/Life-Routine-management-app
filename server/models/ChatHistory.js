import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema({
  profileId: { type: String, required: true },
  sender: { type: String, enum: ['user', 'ai'], required: true },
  text: { type: String, required: true },
  timestamp: { type: String, default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
}, { timestamps: true });

export const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
