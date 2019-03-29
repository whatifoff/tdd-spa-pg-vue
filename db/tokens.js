module.exports = (pool) => {
  return {

    async addRefreshToken(userId, token) {
      const query = 'INSERT INTO tokens(user_id, token) VALUES($1, $2)'
      const values = [userId, token]
      const dbResult = await pool.query(query, values)
      return dbResult
    },


    async hasRefreshToken(token) {
      const query = 'SELECT * FROM tokens WHERE token=$1'
      const values = [token]
      const dbResult = await pool.query(query, values)

      if (dbResult.rows.length > 0) {
        return true
      } else {
        return false
      }
    },


    async getRefreshTokensByToken(refreshToken) {
      const query = 'SELECT * FROM tokens WHERE token=$1'
      const values = [refreshToken]
      const dbResult = await pool.query(query, values)
      return dbResult
    },


    async removeRefreshTokensByUserId(userId) {
      const query = 'DELETE FROM tokens WHERE user_id=$1'
      const values = [userId]
      const dbResult = await pool.query(query, values)
      return dbResult
    },


    async removeRefreshTokensByToken(refreshToken) {
      const query = 'DELETE FROM tokens WHERE token=$1'
      const values = [refreshToken]
      const dbResult = await pool.query(query, values)
      return dbResult
    }
  }
}