const express = require('express')
const path = require('path')
const midwUser = require('../middleware/users')
const midwValidator = require('../middleware/validator')

const router = express.Router()
const p = path.resolve(__dirname, '../client')

router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(p, 'index.html'))
})

router.post('/auth/reg', [
  midwValidator.validateEmail,
  midwValidator.validatePassword,
  midwUser.userCreate
])

router.post('/auth/login', [
  midwValidator.validateEmailSimple,
  midwValidator.validatePassword,
  midwUser.userAuth,
  (req, res) => {
    res.status(200).sendFile(path.join(p, 'secret.html'))
  }
])

module.exports = router