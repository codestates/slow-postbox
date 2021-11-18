const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'slow_postbox',
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0,
  },
  test: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0,
  },
};

module.exports = config;