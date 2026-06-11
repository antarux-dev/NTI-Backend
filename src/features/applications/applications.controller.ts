import { Request, Response } from 'express';
import { applicationStatuses } from './applications.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

export const getApplications = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: 'Tvoje prihlášky boli úspešne načítané.',
    data: [],
  });
};

export const createApplication = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.CREATED,
    success: true,
    message: 'Prihláška bola úspešne vytvorená ako draft.',
    data: { status: applicationStatuses[0] },
  });
};
