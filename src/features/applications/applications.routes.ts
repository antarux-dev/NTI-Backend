import { Router } from 'express';
import {
  getApplications,
  //getApplicationById,
  createApplication,
  //submitApplication,
  //updateApplication,
  //uploadDocument,
} from './applications.controller.js';

const router = Router();
router.get('/', getApplications);
//router.get('/:id', getApplicationById);
router.post('/', createApplication);
//router.post('/:id/submit', submitApplication);
//router.patch('/:id', updateApplication);
//router.post('/:id/documents', uploadDocument);

export default router;
