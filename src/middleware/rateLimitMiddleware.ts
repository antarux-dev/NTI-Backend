import { rateLimit } from 'express-rate-limit';

export function customLimiter(timems: number, limit: number, message: string) {
  return rateLimit({
    windowMs: timems,
    limit: limit,
    message: message,
  });
}

export const limiter = rateLimit({
  windowMs: 600000, // 10 min
  limit: 100,
  message: 'PREKONAL SI RATE LIMIT!',
});

export const authLimiter = rateLimit({
  windowMs: 10000,
  limit: 4,
  message: 'Príliš vela pokusov prilasenia',
})