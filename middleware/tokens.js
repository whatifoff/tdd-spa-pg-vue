const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')

const db = require('../db')
const issueTokens = require('../helpers/issueToken')
const errorGen = require('../helpers/errors').err
const jwtSecret = require('../config').token.access.secret


module.exports = {

  /**
   *  
   * первичный выпуск пары токенов
   * 
   * */
  async issueTokenPairs(req, res, next) {
    const userId = req.body.userid
    const refreshToken = uuid()

    try {
      await db.addRefreshToken(userId, refreshToken)
    } catch (error) {
      return next(error)
    }

    res.body = {
      token: issueTokens({ id: userId }),
      refreshToken
    }

    next()
  },


  /** 
   * 
   * Проверка refresh_token на актуальность
   * 
  */
  async checkRefreshToken(req, res, next) {
    try {
      const result = await db.hasRefreshToken(req.body.refreshToken)
      if (!!result) {
        return next()
      } else {
        errorGen({ status: 404, message: 'Token is not valid.' })
      }
    } catch (error) {
      return next(error)
    }
  },


  /** 
   * 
   * Вытащить user_id из токена
   * 
  */
  getUserIdFromToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, jwtSecret)
    req.body.userid = user.id
    return next()
  },


  /** 
   * 
   * удаление refresh_token
   * 
   * */
  async removeOldRefreshToken(req, res, next) {
    // получить в запросе refresh_token
    const refreshToken = req.body.refreshToken

    // по полученному токену вытащить user_id из БД
    try {
      const rtFromDb = await db.getRefreshTokensByToken(refreshToken)

      if (rtFromDb.rows.length === 0) {
        errorGen({ status: 404, message: 'Token not found.' })
      }

      const userId = rtFromDb.rows[0].user_id

      // удалить старый refresh_token в БД
      await db.removeRefreshTokensByToken(refreshToken)
      req.body.userid = userId
      return next()

    } catch (error) {
      next(error)
    }
  },


  /** 
   * 
   * удаление всех referesh_token
   * 
   * */
  async removeAllTokensByUserId(req, res, next) {
    try {
      await db.removeRefreshTokensByUserId(req.body.userid)
      return next()
    } catch (error) {
      next(error)
    }
  }

}