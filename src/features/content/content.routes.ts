import { Router } from 'express';
import {
  getFaq,
  //getNews,
  //getNewsBySlug
} from './content.controller.js';

const router = Router();

router.get('/faq', getFaq);
//router.get('/news', getNews);
//router.get('/news/:slug', getNewsBySlug);

export default router;
