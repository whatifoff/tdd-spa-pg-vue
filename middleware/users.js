const bcrypt = require('bcrypt')
const dbUser = require('../db/user')

module.exports = {

  async userCreate(req, res) {

    let hash

    hash = await bcrypt.hash(req.body.password, 10)

    const newUser = await dbUser.add(req.body.email, hash)

    res.status(200).json(newUser)
  },


  async userGet(req, res) {
    const newUser = await getByEmail(req.body.email)
    res.status(200).json(newUser)
  }
}