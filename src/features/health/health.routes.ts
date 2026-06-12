import { Router } from 'express';
import { getAppHealth } from './health.controller.js';

const router = Router();
router.get('/', getAppHealth);

export default router;
