class RedisKey {
   static generateSectionKey(userId) {
      return `user_section::${userId}`;
   }
}

module.exports = RedisKey;