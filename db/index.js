const { Pool } = require('pg')
const config = require('../config')
const pool = new Pool(config.db.pg)

const userDB = require('./user')(pool)
const tokenDB = require('./tokens')(pool)

module.exports = {
  add: userDB.add,
  getByEmail: userDB.getByEmail,

  addRefreshToken: tokenDB.addRefreshToken,
  hasRefreshToken: tokenDB.hasRefreshToken,
  getRefreshTokensByToken: tokenDB.getRefreshTokensByToken,
  removeRefreshTokensByUserId: tokenDB.removeRefreshTokensByUserId,
  removeRefreshTokensByToken: tokenDB.removeRefreshTokensByToken
}