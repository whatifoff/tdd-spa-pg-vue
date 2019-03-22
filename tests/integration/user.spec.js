const server = require('../utils')
const { generateUser } = require('../utils/generate')

describe('Опреации с пользователями', () => {

  test('Создание нового пользователя (create). Все данные верны - код 200', async () => {
    const fakeUser = generateUser()

    try {
      const response = await server.post('/users').send(fakeUser)
      const newUser = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(newUser.email).toBe(fakeUser.email)
      expect(newUser.id).toBeDefined()
    } catch (error) {
      throw new Error(error)
    }
  });

  describe('Получение данных о пользователе (read)', () => {

  });

  describe('Обновление данных пользователя (update)', () => {

  });

  describe('Удаление данных пользователя (delete)', () => {

  });

});