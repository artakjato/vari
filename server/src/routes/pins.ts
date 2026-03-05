import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Pin } from '../models/Pin.js';

const router = Router();
router.use(requireAuth);

function sanitizeCompletedSteps(value: unknown): number[] {
  if (!Array.isArray(value)) return [];

  const uniqueSteps = new Set<number>();
  for (const item of value) {
    const parsed = typeof item === 'number' ? item : Number(item);
    if (Number.isInteger(parsed) && parsed > 0) {
      uniqueSteps.add(parsed);
    }
  }

  return [...uniqueSteps].sort((a, b) => a - b);
}

router.get('/api/me/pins', async (req, res) => {
  const pins = await Pin.find({ userId: req.user!.userId });
  res.json(pins);
});

router.post('/api/me/pins', async (req, res) => {
  const body = req.body ?? {};
  const { targetType, targetId, notes } = body;
  const existingPin = await Pin.findOne({ userId: req.user!.userId, targetType, targetId });
  if (existingPin) {
    return res.json(existingPin);
  }

  const pin = await Pin.create({
    userId: req.user!.userId,
    targetType,
    targetId,
    notes: typeof notes === 'string' ? notes : '',
    completedSteps: sanitizeCompletedSteps(body.completedSteps),
  });

  res.status(201).json(pin);
});

router.patch('/api/me/pins/:id', async (req, res) => {
  const body = req.body ?? {};
  const updates: { notes?: string; completedSteps?: number[] } = {};

  if (Object.prototype.hasOwnProperty.call(body, 'notes')) {
    updates.notes = typeof body.notes === 'string' ? body.notes : '';
  }

  if (Object.prototype.hasOwnProperty.call(body, 'completedSteps')) {
    updates.completedSteps = sanitizeCompletedSteps(body.completedSteps);
  }

  const pin = await Pin.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!.userId },
    updates,
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
