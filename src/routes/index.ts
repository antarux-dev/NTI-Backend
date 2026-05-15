import { Router, Request, Response, NextFunction } from 'express';
import { NotFoundError } from '@utils/customErrors.js';
import v1Router from '@/routes/v1.js';

const router = Router();

router.use(`/v1`, v1Router);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`These aren't the endpoints you're looking for.`));
});

export default router;
