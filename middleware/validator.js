const dbUser = require('../db/user')

module.exports = {

  async validateEmail(req, res, next) {

    const email = req.body.email

    if (email) {

      if (/.+@.+\..+/.test(email)) {

        try {

          const userData = await dbUser.getByEmail(req.body.email)

          if (userData) {
            throw new Error('Email dublicate.')
          } else {
            return next()
          }

        } catch (error) {
          throw new Error(error.message)
        }



      } else {
        throw new Error('Email is not valid.')
      }

    } else {
      throw new Error('Email is required.')
    }
  },


  validatePassword(req, res, next) {
    const pass = req.body.password

    if (pass) {
      if (pass.length < 8) {
        throw new Error('Password length must be geater 8 symbols.')
      } else {
        return next()
      }
    } else {
      throw new Error('Password is required.')
    }
  }

}