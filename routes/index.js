const express = require('express')
const path = require('path')
const midwUser = require('../middleware/users')
const midwValidator = require('../middleware/validator')

const router = express.Router()

router.get('/', (req, res) => {
  const p = path.resolve(__dirname, '../client')
  res.status(200).sendFile(path.join(p, 'index.html'))
})

router.post('/users', midwValidator.validateEmail, midwUser.userCreate)

module.exports = router