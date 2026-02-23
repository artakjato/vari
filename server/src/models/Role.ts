import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  industrySlug: { type: String, required: true },  // links to an industry
  tradeoffs: [{ type: String }],                    // array of strings
});

export const Role = mongoose.model('Role', roleSchema);