import { Router } from 'express';
import { healthCheck } from './health.controller.js';
import { authLimiter } from '@/middleware/rateLimitMiddleware.js';

const router = Router();
router.get('/', authLimiter, healthCheck);

export default router;
