const { Pool } = require('pg')
const config = require('../config')
const pool = new Pool(config.db.pg)

const bcrypt = require('bcrypt')

module.exports = {

  async userCreate(req, res) {

    let hash, dbResult

    try {
      hash = await bcrypt.hash(req.body.password, 10)
    } catch (error) {
      throw new Error(`bcrypt error: ${error}`)
    }


    const query = 'INSERT INTO users(user_email, hash) VALUES($1, $2) RETURNING *'
    const values = [req.body.email, hash]

    try {
      dbResult = await pool.query(query, values)
    } catch (error) {
      throw new Error(`pg error: ${error}`)
    }

    const newUser = {
      id: dbResult.rows[0].user_id,
      email: dbResult.rows[0].user_email
    }

    res.status(200).json(newUser)

  }
}