import { Router } from 'express';
import healthRoutes from '@/features/health/health.routes.js';
import { testLimiter } from '@/middleware/rateLimitMiddleware.js';
import documentRoutes from '@/features/documentTest/document.routes.js';

const v1Router = Router();

v1Router.use(`/health`, testLimiter, healthRoutes);
v1Router.use(`/document`, documentRoutes);

export default v1Router;
