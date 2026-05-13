import { Request, Response } from 'express';
import { messageResponses } from './model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { ValidationError } from '@utils/customErrors.js';

export const getResponseMessage = (req: Request, res: Response) => {
  if (Math.random() < 0.3) {
    throw new ValidationError();
  }

  const message = messageResponses[Math.floor(Math.random() * messageResponses.length)];
  sendApiResponse(res, {
    status: 200,
    success: true,
    message: "Generated random message!",
    data: {
      message: message
    },
  });
};
