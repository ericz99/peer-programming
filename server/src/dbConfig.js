require('dotenv').config();

const config = {
  development: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  test: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  production: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
};

console.log(config);
console.log('PROD: ->>>', process.env.NODE_ENV);

module.exports = config;
