import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },  // stored as bcrypt hash (never plain text!)
  displayName: { type: String, default: 'User' },
}, { timestamps: true });   // adds createdAt and updatedAt automatically

export const User = mongoose.model('User', userSchema);

