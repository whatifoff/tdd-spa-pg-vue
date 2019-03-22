const { Pool } = require('pg')
const config = require('../config')
const pool = new Pool(config.db.pg)

module.exports = {

  async add(email, hash) {

    let dbResult

    const query = 'INSERT INTO users(user_email, hash) VALUES($1, $2) RETURNING *'
    const values = [email, hash]

    try {
      dbResult = await pool.query(query, values)
    } catch (error) {
      throw new Error(`pg error: ${error}`)
    }

    const newUser = {
      id: dbResult.rows[0].user_id,
      email: dbResult.rows[0].user_email
    }

    return newUser
  },


  async getByEmail(email) {
    const query = 'SELECT * FROM users WHERE user_email=$1'
    const values = [email]

    try {
      dbResult = await pool.query(query, values)
    } catch (error) {
      throw new Error(`pg error: ${error}`)
    }

    let newUser

    if (dbResult.rowCount > 0) {
      newUser = {
        id: dbResult.rows[0].user_id,
        email: dbResult.rows[0].user_email
      }

      return newUser
    }

    return null
  }
}