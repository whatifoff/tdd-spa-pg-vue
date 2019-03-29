const bcrypt = require('bcrypt')
const db = require('../db')
const saltRounds = require('../config').hash.saltRounds
const errorGen = require('../helpers/errors').err

module.exports = {

  async userCreate(req, res, next) {
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = await db.add(req.body.email, hash)
    res.status(200).json(newUser)
  },


  async userAuth(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    let auth

    try {

      const userFromDb = await db.getByEmail(email)

      if (!!userFromDb) {

        auth = await bcrypt.compare(password, userFromDb.hash)

        if (!!auth) {
          req.body.userid = userFromDb.id
          return next()
        } else {
          errorGen({
            status: 401,
            message: 'Password is wrong.'
          })
        }
      } else {
        errorGen({
          status: 401,
          message: 'User is not register.'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}