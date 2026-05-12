import { NextFunction, Request, Response } from 'express';
import { CustomError } from '@utils/customErrors.js';
import { createApiResponse } from '@/utils/apiResponse.js';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let isOperational = false;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = err.isOperational;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // TODO: Implement structured error logs...
  const errorLog = {
    message: err.message,
    isOperational,
  };
  console.error(errorLog); // Use better logging alternative for error logs...

  const response = createApiResponse(statusCode, false, message);
  res.status(response.statusCode).json(response);
};
