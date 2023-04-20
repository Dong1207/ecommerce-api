
const jwt = require('jsonwebtoken');
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRE_TIME, ACCESS_TOKEN_EXPIRE_TIME } = process.env;
const { AppKeys } = require('@/common/const');
const { ServerError } = require('../errors');

class JwtLib {
   static signToken(tokenType, payload) {
      let token = null;
      try {
         switch (tokenType) {
            case AppKeys.TOKEN_TYPE.ACCESS_TOKEN:
               token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
                  expiresIn: parseInt(ACCESS_TOKEN_EXPIRE_TIME),
               });
               break;
            case AppKeys.TOKEN_TYPE.REFRESH_TOKEN:
               token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
                  expiresIn: parseInt(REFRESH_TOKEN_EXPIRE_TIME),
               });
               break;
            default:
               throw new ServerError('Token type invalid!');
         }
         return token;
      } catch (error) {
         throw error;
      }
   }

   static verifyToken(tokenType, token) {
      let payload = null;
      try {
         switch (tokenType) {
            case AppKeys.TOKEN_TYPE.ACCESS_TOKEN:
               payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
               break;
            case AppKeys.TOKEN_TYPE.REFRESH_TOKEN:
               payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
               break;
            default:
               throw new ServerError('Token type invalid!');
         }
      } catch (error) {
         if (error instanceof jwt.TokenExpiredError) {
            throw new ServerError('Token is Exprired!');
         }

         if (error instanceof jwt.JsonWebTokenError) {
            throw new ServerError(error.message);
         }

         throw new ServerError('Unknow error!');
      }
      return payload;
   }

   static getToken(req) {
      const splitToken = req.get('authorization')?.split(' ');
      if (!splitToken) {
         return null;
      }
      return {
         scheme: splitToken[0],
         token: splitToken[1],
      };
   }

   static decodeToken(token, options) {
      try {
         const decoded = jwt.decode(token, options);
         return decoded;
      } catch (error) {
         throw error;
      }
   }
}

module.exports = JwtLib;
