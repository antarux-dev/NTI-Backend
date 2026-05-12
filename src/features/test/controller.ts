import { Request, Response } from 'express';
import { messageResponses } from './model.js';
import { createApiResponse } from '@utils/apiResponse.js';
import { ValidationError } from '@utils/customErrors.js';

export const getResponseMessage = (req: Request, res: Response) => {
  if (Math.random() < 0.3) {
    throw new ValidationError();
  }

  const message = messageResponses[Math.floor(Math.random() * messageResponses.length)];
  const response = createApiResponse(200, true, message);
  res.status(response.statusCode).json(response);
};
