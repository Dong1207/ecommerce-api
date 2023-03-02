const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const { loggerMiddleware } = require('../middlewares/logger.middleware');
const helmet = require("helmet");

const {
   ALLOW_DOMAINS,
   COOKIE_SECRET
} = process.env;

/**
 * @param {express.Express} app 
 */
function middlewareConfig(app) {
   app.use(helmet());
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());
   app.use(cookieParser(COOKIE_SECRET));

   const whitelist = ALLOW_DOMAINS?.split(',') ?? [];
   app.use(cors({
      origin: function (origin, callback) {
         if (whitelist.indexOf(origin) !== -1 || whitelist.indexOf("*") !== -1) {
            callback(null, true);
         } else {
            callback(new Error('Not allowed by CORS'));
         }
      },
      credentials: true,
      maxAge: 300
   }));

   // Logger
   app.use(loggerMiddleware);
   // Error handle
}

module.exports = middlewareConfig;