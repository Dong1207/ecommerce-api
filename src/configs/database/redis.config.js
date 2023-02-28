const { Redis } = require('ioredis');

const redisURI = process.env.REDIS_URI;
const redisClient = new Redis(redisURI);

async function redisConnect() {
   redisClient.on('connect', () => {
      console.log('redis connect')
   });

   redisClient.once('ready', () => {
      console.log('Redis ready!');
   });

   redisClient.once('error', (err) => {
      console.log('Redis connecte error:', err);
   });
}

module.exports = {
   redisConnect,
   redisClient
};
