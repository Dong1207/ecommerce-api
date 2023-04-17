const RedisKey = require('./redisKey');
const { redisClient } = require('@/configs/database/redis.config');

class RedisLib {
   /**
    * 
    * @param {string} userId - userId of section
    * @param {*} refreshToken - refresh token of user
    * @param {*} tokenExpireTime - expire time of section in seconds
    */
   static async setUserSection(userId, refreshToken, tokenExpireTime) {
      try {
         const res = await redisClient.set(RedisKey.generateSectionKey(userId), refreshToken, 'EX', tokenExpireTime, 'NX');
         console.log('res:', res)
         return res;
      } catch (error) {
         throw error;
      }
   }
   static async removeUserSection(userId, refreshToken) {
      try {
         const res = await redisClient.del(RedisKey.generateSectionKey(userId), refreshToken);
         return res;
      } catch (error) {
         throw error;
      }
   }

   static async getUserSection(userId) {
      try {
         const userSection = await redisClient.get(RedisKey.generateSectionKey(userId));
         return userSection;
      } catch (error) {
         throw error;
      }
   }
}
module.exports = RedisLib;