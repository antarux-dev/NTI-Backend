import { Router, Request, Response } from 'express';
import { createApiResponse } from '../utils/apiResponse.js';

import testRouter from '../features/test/route.js';

const router = Router();
const API_PREFIX = 'v1';

router.use(`/${API_PREFIX}/test`, testRouter);

router.use((req: Request, res: Response) => {
  const response = createApiResponse(
    404,
    false,
    `These aren't the endpoints you're looking for.`
  );

  res.status(response.statusCode).json(response);
});

export default router;
