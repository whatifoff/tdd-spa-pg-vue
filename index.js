const config = require('./config')
const router = require('./routes')

const express = require('express')

const app = express()

app.use(router)

app.listen(config.http.port, () => {
  console.log(`server started on http://${config.http.host}:${config.http.port}`)
})

module.exports = app