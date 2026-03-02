import { Router } from 'express';
import { Industry } from '../models/Industry.js';
import { Role } from '../models/Role.js';

const router = Router();

router.get('/api/map', async (req, res) => {
  try {
    const [industries, roles] = await Promise.all([
      Industry.find(),
      Role.find(),
    ]);
    res.json({ industries, roles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load map data' });
  }
});

export default router;