const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

async function mongoDBConnect() {
   mongoose.connection.on('error', (err) => {
      console.log('Mongodb connection error::', err.message);
   }).once('open', () => {
      console.log('Mongodb connected');
   });
   await mongoose.connect(MONGO_URI);
}

module.exports = mongoDBConnect;