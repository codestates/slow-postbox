const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    timezone: 'Asia/Seoul',
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
    },
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

// const dotenv = require("dotenv");
// dotenv.config();

// const config = {
//   development: {
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     waitForConnections: true,
//     connectionLimit: 1000,
//     queueLimit: 0,
//   },
//   test: {
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     waitForConnections: true,
//     connectionLimit: 1000,
//     queueLimit: 0,
//   },
// };

// module.exports = config;


