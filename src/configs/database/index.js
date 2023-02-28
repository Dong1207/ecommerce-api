const { redisConnect } = require('./redis.config');
const mongoDBConnect = require('./mongodb.config');

async function databaseConfig() {
   try {
      await mongoDBConnect();
      await redisConnect();
   } catch (error) {
      console.log('Database config error::', error);
   }
}

module.exports = databaseConfig;