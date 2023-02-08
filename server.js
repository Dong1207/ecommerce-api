const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 3003

app.get('/', (req, res) => {
  res.send('Hello World1!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})