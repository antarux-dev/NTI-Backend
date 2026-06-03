import express from 'express';
import router from '@/routes/index.js';
import { errorMiddleware } from '@middleware/errorMiddleware.js';
import { corsMiddleware } from '@middleware/corsMiddleware.js';
import { limiter } from '@middleware/rateLimitMiddleware.js';

const app = express();

app.use(corsMiddleware); // MUSI BYT PRVE
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(errorMiddleware);

export default app;
