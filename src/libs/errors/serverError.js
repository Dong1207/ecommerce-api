const HttpException = require('./httpException');

class ServerError extends HttpException {
   constructor(message) {
      super(500, message);
   }
}

module.exports = ServerError;