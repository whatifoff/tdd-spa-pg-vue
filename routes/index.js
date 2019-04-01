const express = require('express')
const path = require('path')
const jwtMidw = require('express-jwt')

const jwtSecret = require('../config').token.access.secret
const midwUser = require('../middleware/users')
const midwValidator = require('../middleware/validator')
const midwTokens = require('../middleware/tokens')

const router = express.Router()
const p = path.resolve(__dirname, '../client/dist')

router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(p, 'index.html'))
})

router.post('/auth/reg', [
  midwValidator.validateEmail,
  midwValidator.validatePassword,
  midwUser.userCreate,
  (req, res) => {
    res.status(200).end()
  }
])


router.post('/auth/login', [
  midwValidator.validateEmailSimple,
  midwValidator.validatePassword,
  midwUser.userAuth,
  midwTokens.issueTokenPairs,
  (req, res) => {
    res.status(200).send(res.body)
  }
])


router.post('/auth/refresh', [
  midwTokens.removeOldRefreshToken,
  midwTokens.issueTokenPairs,
  (req, res) => {
    res.status(200).send(res.body)
  }
])


router.post('/auth/logout', [
  midwTokens.checkRefreshToken,
  midwTokens.getUserIdFromToken,
  midwTokens.removeAllTokensByUserId,
  (req, res) => {
    res.status(200).end()
  }
])


router.get('/secret', [
  jwtMidw({ secret: jwtSecret }),
  // midwTokens.removeOldRefreshToken,
  // midwTokens.issueTokenPairs,
  (req, res) => {
    res.status(200).send(res.body)
  }
])


module.exports = router
