import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Pin } from '../models/Pin.js';

const router = Router();
router.use(requireAuth);

router.get('/api/me/pins', async (req, res) => {
  const pins = await Pin.find({ userId: req.user!.userId });
  res.json(pins);
});

router.post('/api/me/pins', async (req, res) => {
  const { targetType, targetId, notes } = req.body;
  const existingPin = await Pin.findOne({ userId: req.user!.userId, targetType, targetId });
  if (existingPin) {
    return res.json(existingPin);
  }
  const pin = await Pin.create({ userId: req.user!.userId, targetType, targetId, notes });
  res.status(201).json(pin);
});

router.patch('/api/me/pins/:id', async (req, res) => {
  const pin = await Pin.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!.userId },
    { notes: req.body.notes },
    { new: true }
  );
  if (!pin) return res.status(404).json({ error: 'Pin not found' });
  res.json(pin);
});

router.delete('/api/me/pins/:id', async (req, res) => {
  await Pin.findOneAndDelete({ _id: req.params.id, userId: req.user!.userId });
  res.json({ success: true });
});

export default router;
