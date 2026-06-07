import { Router } from "express";
import { index, store } from './document.controller.js';
import { uploader, DOCUMENT_PATH, privateUploader } from '@middleware/fileUploadMiddleware.js';

const router = Router();
router.get('/', index);
router.post('/store', privateUploader().single('cv'), store);

export default router;