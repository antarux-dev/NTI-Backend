import { Router, Request, Response } from 'express';
import testRouter from './test.js';

const router = Router();

router.use('/test', testRouter);

router.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `These aren't the endpoints you're looking for.`,
    path: req.path,
  });
});

export default router;
