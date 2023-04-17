const { HttpException, ServerError } = require('../libs/errors');

module.exports = {
   /**
    * 
    * @param {Error} err 
    * @param {import("express").Response} res 
    */
   handleErrors: async (err, _, res, next) => {
      if (err instanceof HttpException) {
         res.status(err.status).json({ status: err.status, message: err.message });
         return;
      }

      const serverError = new ServerError();
      res.status(serverError.status).json({ status: serverError.status, message: serverError.message });
   }
};