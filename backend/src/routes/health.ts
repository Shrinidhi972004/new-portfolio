import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

// GET /api/health - Health check endpoint
router.get('/', (_req: Request, res: Response) => {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    },
  };

  res.json(healthCheck);
});

// GET /api/health/ready - Readiness probe for Kubernetes
router.get('/ready', (_req: Request, res: Response) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ status: 'ready' });
  } else {
    res.status(503).json({ status: 'not ready', reason: 'Database not connected' });
  }
});

// GET /api/health/live - Liveness probe for Kubernetes
router.get('/live', (_req: Request, res: Response) => {
  res.json({ status: 'alive' });
});

export default router;
