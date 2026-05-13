import { Request, Response } from 'express';
import { messageResponses } from './model.js';
import { sendApiResponse } from '@utils/apiResponse.js';

export const healthCheck = (req: Request, res: Response) => {
  const message = messageResponses[Math.floor(Math.random() * messageResponses.length)];
  sendApiResponse(res, {
    status: 200,
    success: true,
    message: message,
  });
};
