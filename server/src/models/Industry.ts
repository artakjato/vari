import mongoose from 'mongoose';

//sub-scheas for nested data (stacks inside districts inside industries)
const techStackSchema = new mongoose.Schema ({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  url: { type: String, required: true },
}, { _id: false }); 

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  stacks: [techStackSchema],  // array of tech stacks
}, { _id: false });

const industrySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subtitle: { type: String, default: '' },
  color: { type: String, required: true },
  icon: { type: String, default: '' },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  children: [districtSchema],   // array of districts
});

export const Industry = mongoose.model('Industry', industrySchema);