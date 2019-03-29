const he = require('../../helpers/errors').err

describe('Проверка работы helper/errors', () => {

  test('Если передан status, возвращается этот статус', () => {
    const status = 401
    let e
    try {
      e = he({
        status
      })
    } catch (error) {
      expect(error.status).toBe(status)
    }
  })

  test('Если не передан status, возвращается 500', () => {
    let e
    try {
      e = he({
        message: 'Error testing'
      })
    } catch (error) {
      expect(error.status).toBe(500)
    }
  })

  test('Если передано сообщение, оно и возвращается ', () => {
    const message = 'test error message.'
    let e
    try {
      e = he({
        message
      })
    } catch (error) {
      expect(error.message).toBe(message)
    }
  })

  test('Если не передано сообщение, возвращается "Server error."', () => {
    let e
    try {
      e = he({
        status: 401
      })
    } catch (error) {
      expect(error.message).toBe('Server error.')
    }
  })
})