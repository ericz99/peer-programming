import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import path from 'path';

import getModels from './db';
import logger from './logger';
import socket from './socket';

export const createAppServer = async () => {
  const app = express();
  const server = http.createServer(app);

  app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(morgan('dev'))
    .use(helmet());

  await getModels().then((models) => {
    if (!models) {
      logger.log({
        level: 'error',
        message: 'Could not connect to database'
      });
    }

    // # load socket server
    socket(server);
  });

  app.get('/test', (_req, res, _next) => {
    return res.send('auth_service: hit!');
  });

  // server static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static(path.resolve(__dirname, '..', '..', 'client/build')));

    app.get('*', (_req, res, _next) => {
      res.sendFile(path.resolve(__dirname, '..', '..', 'client/build/index.html'));
    });
  }

  return {
    app,
    server
  };
};

// server socket isn't working error
