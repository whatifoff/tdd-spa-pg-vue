module.exports = (pool) => {

  return {
    async add(email, hash) {

      let dbResult

      const query = 'INSERT INTO users(user_email, hash) VALUES($1, $2) RETURNING *'
      const values = [email, hash]

      dbResult = await pool.query(query, values)

      const newUser = {
        id: dbResult.rows[0].user_id,
        email: dbResult.rows[0].user_email
      }

      return newUser
    },


    async getByEmail(email) {
      const query = 'SELECT * FROM users WHERE user_email=$1'
      const values = [email]
      let dbResult, newUser

      dbResult = await pool.query(query, values)

      if (dbResult.rowCount > 0) {
        newUser = {
          id: dbResult.rows[0].user_id,
          email: dbResult.rows[0].user_email,
          hash: dbResult.rows[0].hash
        }

        return newUser
      }

      return null
    }
  }
}