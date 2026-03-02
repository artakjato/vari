import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { comparePassword, generateToken, hashPassword } from '../services/authService.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts, please try again later' },
});

router.post('/api/auth/register', authLimiter, async (req, res) => {
  const { email, password, displayName } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'Email already registered' });

  const hashed = await hashPassword(password);
  const user = await User.create({ email, password: hashed, displayName });
  const token = generateToken(user._id.toString());

  res.status(201).json({ token, user: { email, displayName } });
});

router.post('/api/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken(user._id.toString());
  res.json({ token, user: { email: user.email, displayName: user.displayName } });
});

router.get('/api/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.user!.userId, '-password');
  res.json(user);
});

export default router;