import { Request, Response } from 'express';
import { profileResponses } from './organizations.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

export const getStudentProfile = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: 'Študentský profil načítaný.',
    data: {},
  });
};

export const updateStudentProfile = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: profileResponses[0],
  });
};
