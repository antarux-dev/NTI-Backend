import { Router } from 'express';
import { getResponseMessage } from './controller.js';

const router = Router();
router.get('/', getResponseMessage);

export default router;
