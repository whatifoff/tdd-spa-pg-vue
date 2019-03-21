const server = require('../utils')
const { generateUser } = require('../utils/generate')

describe('Опреации с пользователями', () => {
  test('Создание нового пользователя (create)', async () => {
    const fakeUser = generateUser()
    const response = await server.post('/users').send(fakeUser)

    const newUser = JSON.parse(response.text)

    expect(response.status).toBe(200)
    expect(newUser.email).toBe(fakeUser.email)
    expect(newUser.id).toBeDefined()
  });

  test('Получение данных о пользователе (read)', async () => {

  });

  test('Обновление данных пользователя (update)', async () => {

  });

  test('Удаление данных пользователя (delete)', async () => {

  });

});