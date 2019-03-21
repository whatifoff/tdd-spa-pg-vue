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
            next()
          }

        } catch (error) {
          // console.log('ErrOr:', error)
          throw new Error(error.message)
        }



      } else {
        throw new Error('Email is not valid.')
      }

    } else {
      throw new Error('Email is required.')
    }
  }

}