import { Router } from "express";
import { index } from './document.controller.js';

const router = Router();
router.get('/', index);

export default router;