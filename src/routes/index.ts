import { Router, Request, Response, NextFunction } from 'express';
import healthRouter from '@features/health/route.js';
import { NotFoundError } from '@utils/customErrors.js';

const router = Router();
const API_PREFIX = 'v1';

router.use(`/${API_PREFIX}/test`, healthRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`These aren't the endpoints you're looking for.`));
});

export default router;
