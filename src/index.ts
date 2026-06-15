import app from './app.js';
import { env } from '@config/env.js';

app.listen(env.PORT, () => {
  console.warn(`
    Server surprisingly successfully started for "${env.NODE_ENV}" environment:
    Listening on localhost:${env.PORT}
  `);
});
