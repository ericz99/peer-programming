import { createAppServer } from './app';

import config from './config';
import logger from './logger';

const { server } = createAppServer();

server.listen(config.port, () =>
  logger.log({
    level: 'info',
    message: `Server running on port ${config.port}`
  })
);
