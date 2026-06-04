import { Router } from 'express';
import healthRoutes from '@/features/health/health.routes.js';
import { testLimiter } from '@/middleware/rateLimitMiddleware.js';

const v1Router = Router();

v1Router.use(`/health`, testLimiter, healthRoutes);

export default v1Router;
