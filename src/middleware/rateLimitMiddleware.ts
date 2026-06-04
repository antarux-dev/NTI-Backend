import { rateLimit } from 'express-rate-limit';
import { createApiResponse } from '@/utils/apiResponse.js';
import { HTTP_STATUS } from '@/config/httpStatus.js';

export function customLimiter(timems: number, limit: number, message: string, statusCode: number = 429) {
  return rateLimit({
    windowMs: timems,
    limit: limit,
    message: createApiResponse({
      status: statusCode,
      success: false,
      message: message,
    }),
    statusCode: statusCode,
  });
}

export const limiter = rateLimit({
  windowMs: 600000, // 10 min
  limit: 100,
  message: createApiResponse({
    status: HTTP_STATUS.TOO_MANY_REQUESTS,
    success: false,
    message: 'Too many requests1',
  }),
});

export const authLimiter = rateLimit({
  windowMs: 10000,
  limit: 4,
  message: createApiResponse({
    status: HTTP_STATUS.TOO_MANY_REQUESTS,
    success: false,
    message: 'Too many attempts to authorize',
  }),
})