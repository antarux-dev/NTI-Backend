import app from './app.js';
import { env } from '@config/env.js';

app.listen(env.PORT, () => {
  console.warn(`
    Server suprisingly successfully started for "${env.NODE_ENV}" enviroment:
    Listening on localhost:${env.PORT}
  `);
});
