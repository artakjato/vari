import { Router } from 'express';
import { Industry } from '../models/Industry';
import { Role } from '../models/Role';

const router = Router();

router.get('/api/search', async (req, res) => {
  const q = req.query.q as string;
  if (!q || q.length < 2) return res.json({ results: [] });

  const regex = new RegExp(q, 'i');  // case-insensitive partial match
  const [industries, roles] = await Promise.all([
    Industry.find({ name: regex }, 'name slug color'),
    Role.find({ name: regex }, 'name slug industrySlug'),
  ]);

  const results = [
    ...industries.map(i => ({ type: 'industry', name: i.name, slug: i.slug, color: i.color })),
    ...roles.map(r => ({ type: 'role', name: r.name, slug: r.slug, parent: r.industrySlug })),
  ];
  res.json({ results });
});

export default router;