import { Router } from "express";
import { index, store } from './document.controller.js';
import { privateUploader } from '@middleware/fileUploadMiddleware.js';

const router = Router();
router.get('/', index);
// router.post('/store', uploader({ path: DOCUMENT_PATH.PUBLIC }).single('cv'), store);
router.post('/store', privateUploader().single('cv'), store);

export default router;