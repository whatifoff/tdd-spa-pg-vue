const config = require('./config')
const router = require('./routes')

const express = require('express')
const path = require('path')

const app = express()

app.use(router)

app.use('/public', express.static(path.join(__dirname, 'client')))

app.listen(config.http.port, () => {
  console.log(`server started on http://${config.http.host}:${config.http.port}`)
})

module.exports = app