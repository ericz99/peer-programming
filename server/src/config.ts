const config = {
  port: 5002,
  localMongoUri: 'mongodb://localhost/twitter-clone-db',
  secretKey: '$#EADTAT#WTTWAST',
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  api: {
    prefix: '/api',
    version: 'v1'
  }
};

export default config;
