import { Router } from 'express';
import healthRoutes from '@/features/health/health.routes.js';
import applicationsRoutes from '@/features/applications/applications.routes.js';
import contentRoutes from '@/features/content/content.routes.js';
import notificationsRoutes from '@/features/notifications/notifications.routes.js';
import organizationsRoutes from '@/features/organizations/organizations.routes.js';
import programsRoutes from '@/features/programs/programs.routes.js';
import teamsRoutes from '@/features/teams/teams.routes.js';

import { testLimiter } from '@/middleware/rateLimitMiddleware.js';

const v1Router = Router();

v1Router.use(`/health`, testLimiter, healthRoutes);
v1Router.use(`/applications`, applicationsRoutes);
v1Router.use(`/content`, contentRoutes);
v1Router.use(`/notifications`, notificationsRoutes);
v1Router.use(`/organizations`, organizationsRoutes);
v1Router.use(`/programs`, programsRoutes);
v1Router.use(`/teams`, teamsRoutes);

export default v1Router;
