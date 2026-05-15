import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  timestamp: string;
  data?: T;
}
export type ApiResponseOptions<T = unknown> = {
  status: number;
  success: boolean;
  message: string;
  data?: T;
};

export const createApiResponse = <T = unknown>(options: ApiResponseOptions<T>): ApiResponse<T> => {
  const { status, success, message, data } = options;
  const response: ApiResponse<T> = {
    status,
    success,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== undefined) {
    response.data = data;
  }

  return response;
};

export const sendApiResponse = <T = unknown>(
  res: Response,
  options: ApiResponseOptions<T>
): void => {
  const response = createApiResponse(options);
  res.status(response.status).json(response);
};
