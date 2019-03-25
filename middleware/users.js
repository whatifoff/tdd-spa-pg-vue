const bcrypt = require('bcrypt')
const dbUser = require('../db/user')
const saltRounds = require('../config').hash.saltRounds

module.exports = {

  async userCreate(req, res, next) {
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = await dbUser.add(req.body.email, hash)
    res.status(200).json(newUser)
  },


  async userAuth(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    let auth

    try {

      const userFromDb = await dbUser.getByEmail(email)

      if (!!userFromDb) {

        auth = await bcrypt.compare(password, userFromDb.hash)

        if (!!auth) {
          return next()
        } else {
          throw new Error('Password is wrong.')
        }
      } else {
        throw new Error('User is not register.')
      }
    } catch (error) {
      next(error)
    }
  }
}