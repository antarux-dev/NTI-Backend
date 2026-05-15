import { Router } from 'express';
import healthRoutes from '@/features/health/health.routes.js';

const v1Router = Router();

v1Router.use(`/health`, healthRoutes);

export default v1Router;
