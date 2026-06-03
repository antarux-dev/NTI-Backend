import { Router } from 'express';
import { healthCheck } from './health.controller.js';
import { customLimiter } from '@/middleware/rateLimitMiddleware.js';

const router = Router();
router.get('/', customLimiter(60000, 10, "test"), healthCheck);

export default router;