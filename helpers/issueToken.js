const jwt = require('jsonwebtoken')
const jwtSecret = require('../config').token.access.secret

module.exports = (data, options = {}) => jwt.sign(data, jwtSecret, options)