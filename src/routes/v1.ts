import { Router } from 'express';
import healthRouter from '@features/health/route.js';

const v1Router = Router();

v1Router.use(`/health`, healthRouter);

export default v1Router;
