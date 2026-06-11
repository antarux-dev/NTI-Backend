import { Request, Response } from 'express';
import { mockFaq } from './content.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

export const getFaq = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: 'FAQ úspešne načítané.',
    data: mockFaq,
  });
};
