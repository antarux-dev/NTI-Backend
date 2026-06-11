import { Router } from 'express';
import {
  getNotifications,
  //markAsRead,
  markAllAsRead,
} from './notifications.controller.js';

const router = Router();

router.get('/', getNotifications);
//router.patch('/:id/read', markAsRead);
router.post('/read-all', markAllAsRead);

export default router;
