import { Request, Response } from 'express';
import { HTTP_STATUS } from "@/config/httpStatus.js";
import { sendApiResponse } from "@/utils/apiResponse.js";
import { readdirSync } from 'fs';

export const index = (req: Request, res: Response) => {
  const files = readdirSync('src/uploads').length;

  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: files.toString(),
  });
};

export const store = (req: Request, res: Response) => {
  // TODO: Uloženie do databazy. Ak nevyjde error response a vymazať subor.

  sendApiResponse(res, {
    status: HTTP_STATUS.CREATED,
    success: true,
    message: "Document saved successfully: " + req.file?.destination + " " + req.file?.originalname + " " + req.file?.filename
  });
};