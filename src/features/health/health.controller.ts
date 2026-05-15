import { Request, Response } from 'express';
import { messageResponses } from './health.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

export const healthCheck = (req: Request, res: Response) => {
  const message = messageResponses[Math.floor(Math.random() * messageResponses.length)];
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: message,
  });
};
