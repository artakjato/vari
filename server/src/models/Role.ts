import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['free', 'paid'], default: 'free' },
}, { _id: false });

const learningStepSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  estimatedHours: { type: Number, default: 0 },
  resources: [resourceSchema],
}, { _id: false });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  url: { type: String, required: true },
  rating: { type: Number, default: 0 },
  type: { type: String, enum: ['free', 'paid'], default: 'free' },
  timeToMarket: { type: String },
  postGradSalary: { type: Number },
}, { _id: false });

const roleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  industrySlug: { type: String, required: true },
  districtSlug: { type: String, default: '' },
  learningPath: [learningStepSchema],
  courses: [courseSchema],
});

export const Role = mongoose.model('Role', roleSchema);
