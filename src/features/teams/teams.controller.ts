import { Request, Response } from 'express';
import { teamResponses } from './teams.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

export const getMyTeam = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: 'Dáta o tíme načítané.',
    data: null, // null ak používateľ nemá tím podľa frontendu
  });
};

export const createTeam = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.CREATED,
    success: true,
    message: teamResponses[1],
    data: { id: 42, name: 'Dream Team' },
  });
};
