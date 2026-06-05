import { Request, Response } from 'express';
import { HTTP_STATUS } from "@/config/httpStatus.js"
import { sendApiResponse } from "@/utils/apiResponse.js"
import { readdirSync } from 'fs';

export const index = (req: Request, res: Response) => {
  const files = readdirSync('src/uploads').length;

  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: files.toString(),
  });
}