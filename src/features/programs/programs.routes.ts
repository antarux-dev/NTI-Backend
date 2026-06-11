import { Router } from 'express';
import {
  //getPrograms,
  //getProgramById,
  getCalls,
  getCallById,
} from './programs.controller.js';

const router = Router();

//router.get('/programs', getPrograms);
//router.get('/programs/:id', getProgramById);
router.get('/calls', getCalls);
router.get('/calls/:id', getCallById);

export default router;
