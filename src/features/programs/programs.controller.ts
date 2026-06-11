import { Request, Response } from 'express';
import { mockCalls } from './programs.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

export const getCalls = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: 'Výzvy úspešne načítané.',
    data: mockCalls,
  });
};

export const getCallById = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: 'Detail výzvy načítaný.',
    data: mockCalls[0],
  });
};
