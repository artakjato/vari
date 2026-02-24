import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

// Extend Express Request to include 'user'
declare global {
  namespace Express {
    interface Request { user?: { userId: string } }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.user = verifyToken(token);
    next();  // token is valid, continue to the route handler
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}