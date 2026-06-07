import { rateLimit } from 'express-rate-limit';
import { ExceededRateLimitError } from '@/utils/customErrors.js';

interface LimiterOptions {
  windowMs: number;
  limit: number;
  message?: string;
};

export function customLimiter(options: LimiterOptions) {
  const { windowMs, limit, message } = options;

  return rateLimit({
    windowMs: windowMs,
    limit: limit,
    handler: (req, res, next) => {
      next(new ExceededRateLimitError(message || ""));
    },
  });
};

export const testLimiter = customLimiter({
  windowMs: 10000,
  limit: 10,
  message: 'Yooo slow down!',
});


export const authLimiter = customLimiter({
  windowMs: 10000,
  limit: 4,
  message: 'Too many attempts to authorize!',
});