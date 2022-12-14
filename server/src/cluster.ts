import cluster from 'cluster';
import os from 'os';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import logger from './logger';
import config from './config';

const CORE_CPU = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < CORE_CPU; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, _code, _signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();

  app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(morgan('dev'))
    .use(helmet());

  app.get('/', (_req, res, _next) => {
    return res.send('auth_service: hit!');
  });

  app.listen(config.port, () =>
    logger.log({
      level: 'info',
      message: `Server running on port ${config.port}`
    })
  );
}
