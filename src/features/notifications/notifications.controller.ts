import { Request, Response } from 'express';
import { mockNotifications } from './notifications.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

export const getNotifications = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: 'Notifikácie načítané.',
    data: mockNotifications,
  });
};

export const markAllAsRead = (req: Request, res: Response) => {
  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: 'Všetky notifikácie boli označené ako prečítané.',
  });
};
