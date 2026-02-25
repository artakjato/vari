import { Router } from 'express';
import { Pin } from '../models/Pin';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.use(requireAuth);  // all routes below require login

// Get all my pins
router.get('/api/me/pins', async (req, res) => {
  const pins = await Pin.find({ userId: req.user!.userId });
  res.json(pins);
});

// Create a pin
router.post('/api/me/pins', async (req, res) => {
  const { targetType, targetId, notes } = req.body;
  const pin = await Pin.create({ userId: req.user!.userId, targetType, targetId, notes });
  res.status(201).json(pin);
});

// Update a pin's notes
router.patch('/api/me/pins/:id', async (req, res) => {
  const pin = await Pin.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!.userId }, // ensure ownership!
    { notes: req.body.notes },
    { new: true }
  );
  if (!pin) return res.status(404).json({ error: 'Pin not found' });
  res.json(pin);
});

// Delete a pin
router.delete('/api/me/pins/:id', async (req, res) => {
  await Pin.findOneAndDelete({ _id: req.params.id, userId: req.user!.userId });
  res.json({ success: true });
});