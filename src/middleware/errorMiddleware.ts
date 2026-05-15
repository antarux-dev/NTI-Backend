import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@utils/customErrors.js';
import { sendApiResponse } from '@/utils/apiResponse.js';
import { isProduction } from '@/config/env.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

export type error = {
  status: number;
  message: string;
  isExpectedError: boolean;
  timestamp: string;
  stack?: string | undefined;
  path: string;
  method: string;
};

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const error: error = {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Server Error',
    isExpectedError: false,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
  };

  if (err instanceof CustomError) {
    error.status = err.status;
    error.message = err.message;
    error.isExpectedError = err.isExpectedError;
  }

  if (!error.isExpectedError) {
    error.stack = err.stack;
  }

  // TODO: Use pino logging for error loggin while the production
  // https://getpino.io/#/
  console.error(error);

  const responseMessage =
    isProduction && !error.isExpectedError ? 'Internal Server Error' : error.message;

  const clientStatus =
    isProduction && !error.isExpectedError ? HTTP_STATUS.INTERNAL_SERVER_ERROR : error.status;

  sendApiResponse(res, {
    status: clientStatus,
    success: false,
    message: responseMessage,
  });
};
