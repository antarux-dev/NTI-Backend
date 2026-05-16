import cors from 'cors';
import { env, isProduction } from '@config/env.js';
import { HTTP_STATUS } from '@config/httpStatus.js';
import { UnauthorizedError } from '@utils/customErrors.js';

const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(',');

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (isProduction) {
      if (!origin || !allowedOrigins.includes(origin)) {
        callback(new UnauthorizedError('CORS gate-keeper is turning you away traveler...'));
        return;
      }
    }
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: HTTP_STATUS.NO_CONTENT,
};

export const corsMiddleware = cors(corsOptions);
