import { createAppServer } from './app';

import config from './config';
import logger from './logger';

(async () => {
  const { server } = await createAppServer();

  server.listen(config.port, () =>
    logger.log({
      level: 'info',
      message: `Server running on port ${config.port}`
    })
  );
})();
