const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/', (req, res) => {
  const p = path.resolve(__dirname, '../client')
  res.status(200).sendFile(path.join(p, 'index.html'))
})

module.exports = router