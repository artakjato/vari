import mongoose from 'mongoose';

const pinSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['role', 'industry'], required: true },
  targetId: { type: String, required: true },   // slug of the pinned role/industry
  notes: { type: String, default: '' },
}, { timestamps: true });

export const Pin = mongoose.model('Pin', pinSchema);