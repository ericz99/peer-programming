import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5002,
  db_name: process.env.DB_NAME,
  db_host: process.env.DB_HOST,
  db_pass: process.env.DB_PASS,
  db_user: process.env.DB_USER,
  db_port: process.env.DB_PORT,
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
