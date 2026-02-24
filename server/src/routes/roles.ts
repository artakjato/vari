import { Router } from 'express';
import { Role } from '../models/Role';

const router = Router();

// GET /api/roles/:slug — returns one role's full data
router.get('/api/roles/:slug', async (req, res) => {
  try {
    const role = await Role.findOne({ slug: req.params.slug });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load role' });
  }
});

export default router;