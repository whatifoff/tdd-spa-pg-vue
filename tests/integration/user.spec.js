const server = require('../utils')
const { generateUser } = require('../utils/generate')
const { add } = require('../../db/user')
const bcrypt = require('bcrypt')
const saltRounds = require('../../config').hash.saltRounds


describe('Опреации с пользователями', () => {

  describe('Регистрация нового пользователя', () => {
    test('Все данные верны - код 200', async () => {
      const fakeUser = generateUser()

      const response = await server.post('/auth/reg').send(fakeUser)
      const newUser = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(newUser.email).toBe(fakeUser.email)
      expect(newUser.id).toBeDefined()
    });
  });

  describe('Аутентификация пользователя', () => {
    test('Корректные данные пользователя', async () => {
      const fakeUser = generateUser()

      const hash = await bcrypt.hash(fakeUser.password, saltRounds)
      await add(fakeUser.email, hash)

      const response = await server.post('/auth/login').send(fakeUser)
      expect(response.status).toBe(200)
    });

    test('Данные не зарегистрированного ранее пользователя', async () => {
      const fakeUser = generateUser()

      const response = await server.post('/auth/login').send(fakeUser)

      expect(response.error.status).toBe(500)
    });

    test('НЕ Корректные данные пользователя', async () => {
      const fakeUser = generateUser()
      const fakeUser2 = generateUser()

      const hash = await bcrypt.hash(fakeUser.password, saltRounds)
      await add(fakeUser.email, hash)

      fakeUser.password = fakeUser2.password

      const response = await server.post('/auth/login').send(fakeUser)
      expect(response.status).toBe(500)
    });

  });
});