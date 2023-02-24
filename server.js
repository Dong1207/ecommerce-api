const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3003;
const syncServer = require('./helper/getIp')

syncServer.syncToCloudflare();

app.get('/', (req, res) => {
  res.send('Hello World Dong!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});