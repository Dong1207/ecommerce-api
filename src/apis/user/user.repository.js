const JwtLib = require('@/libs/auth/jwt');
const { RedisLib } = require('@/libs/database');
const { AppKeys } = require('@/common/const');
const { ServerError } = require('@/libs/errors');

class UserRepository {
   async getUserByAnyField() {

   }
   convertRoleName(roles) {
      let authorities = [];
      for (let i = 0; i < roles.length; i++) {
         authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      return authorities;
   }
   async getRefreshTokenAvalid(userId) {
      let refreshToken = await RedisLib.getUserSection(userId);
      try {
         if (refreshToken) {
            JwtLib.verifyToken(AppKeys.TOKEN_TYPE.REFRESH_TOKEN, refreshToken);
         }
      } catch (error) {
         if (error.status === 500 && error.message === 'Token is Exprired!') {
            await RedisLib.removeUserSection(userId, refreshToken);
            refreshToken = await this.getRefreshTokenAvalid(userId);
         } else {
            throw new ServerError('Unknow error!');
         }
      }
      return refreshToken;
   }
}

module.exports = UserRepository;