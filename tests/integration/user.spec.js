const server = require('../utils')
const { generateUser } = require('../utils/generate')
const { add, hasRefreshToken } = require('../../db')
const bcrypt = require('bcrypt')
const saltRounds = require('../../config').hash.saltRounds
const issueToken = require('../../helpers/issueToken')


describe('Опреации с пользователями', () => {

  describe('Регистрация нового пользователя', () => {

    test('Все данные верны - код 200', async () => {
      const fakeUser = generateUser()

      const response = await server.post('/auth/reg').send(fakeUser)
      const newUser = JSON.parse(response.text)

      expect(response.status).toBe(200)
      expect(newUser.email).toBe(fakeUser.email)
      expect(newUser.id).toBeDefined()
    })
  })

  describe('Аутентификация пользователя', () => {
    test('Корректные данные пользователя - код 200 + токены', async () => {
      const fakeUser = generateUser()

      const hash = await bcrypt.hash(fakeUser.password, saltRounds)
      await add(fakeUser.email, hash)

      const response = await server.post('/auth/login').send(fakeUser)

      expect(response.status).toBe(200)
      expect(response.body.token).toBeDefined()
      expect(response.body.refreshToken).toBeDefined()
    })

    test('Данные не зарегистрированного ранее пользователя', async () => {
      const fakeUser = generateUser()

      const response = await server.post('/auth/login').send(fakeUser)

      expect(response.error.status).toBe(401)
      expect(response.body.token).not.toBeDefined()
      expect(response.body.refreshToken).not.toBeDefined()
    })

    test('НЕ Корректные данные пользователя', async () => {
      const fakeUser = generateUser()
      const fakeUser2 = generateUser()

      const hash = await bcrypt.hash(fakeUser.password, saltRounds)
      await add(fakeUser.email, hash)

      fakeUser.password = fakeUser2.password

      const response = await server.post('/auth/login').send(fakeUser)
      expect(response.status).toBe(401)
      expect(response.body.token).not.toBeDefined()
      expect(response.body.refreshToken).not.toBeDefined()
    })

    test('Пользователь должен получить 401 на "протухшем" токене', async () => {
      const expiredToken = issueToken({ id: 1 }, { expiresIn: '1ms' })
      const response = await server
        .get('/secret')
        .set('Authorization', `Bearer ${expiredToken}`)
      expect(response.status).toBe(401)
    })

    test('Пользователь должен получить 200 при нормальном входе на /secret', async () => {
      const expiredToken = issueToken({ id: 1 }, { expiresIn: '1000ms' })
      const response = await server
        .get('/secret')
        .set('Authorization', `Bearer ${expiredToken}`)
      expect(response.status).toBe(200)
    })

    test('Пользователь может обновить access_token используя refresh_token', async () => {
      // arrange
      const fakeUser = generateUser()
      const hash = await bcrypt.hash(fakeUser.password, saltRounds)
      await add(fakeUser.email, hash)
      const responseA = await server.post('/auth/login').send(fakeUser)
      const rt = responseA.body.refreshToken

      // action
      const responseB = await server.post('/auth/refresh').send({
        refreshToken: rt
      })

      // assertions
      expect(responseB.status).toBe(200)
      expect(responseB.body.token).toBeDefined()
      expect(responseB.body.refreshToken).toBeDefined()
      expect(responseB.body.refreshToken).not.toBe(rt)
    })

    test('Пользователь получает 404 при не валидном refresh_token', async () => {
      const refreshToken = 'INVALID_REFRESH_TOKEN'
      const response = await server.post('/auth/refresh').send({
        refreshToken
      })

      expect(response.status).toBe(404)
    })

    test('Пользователь может воспользоваться токеном только единожды', async () => {
      // arrange
      const fakeUser = generateUser()
      const hash = await bcrypt.hash(fakeUser.password, saltRounds)
      await add(fakeUser.email, hash)
      const response = await server.post('/auth/login').send(fakeUser)
      const refreshToken = response.body.refreshToken

      // action
      const responseA = await server.post('/auth/refresh').send({
        refreshToken
      })

      const responseB = await server.post('/auth/refresh').send({
        refreshToken
      })

      // assertions
      expect(responseA.status).toBe(200)
      expect(responseA.body.token).toBeDefined()
      expect(responseA.body.refreshToken).toBeDefined()
      expect(responseA.body.refreshToken).not.toBe(refreshToken)
      expect(responseB.status).toBe(404)
    })

    test('При обращении к /auth/logout удаляются все token', async () => {
      // arrange
      let response

      const fakeUser = generateUser()
      const hash = await bcrypt.hash(fakeUser.password, saltRounds)
      await add(fakeUser.email, hash)

      response = await server.post('/auth/login').send(fakeUser)
      const refreshTokenFirst = response.body.refreshToken

      response = await server.post('/auth/refresh').send({
        refreshToken: refreshTokenFirst
      })
      const refreshTokenSecond = response.body.refreshToken
      const accessTokenSecond = response.body.token

      // action
      response = await server
        .post('/auth/logout')
        .set('Authorization', `Bearer ${accessTokenSecond}`)
        .send({
          refreshToken: refreshTokenSecond
        })

      // assertions
      expect(response.body.refreshToken).not.toBeDefined()
      expect(response.body.token).not.toBeDefined()
      expect(await hasRefreshToken(refreshTokenFirst)).toBeFalsy()
      expect(await hasRefreshToken(refreshTokenSecond)).toBeFalsy()
    })

    test('При не валидном refresh_token на logout - 404', async () => {
      //  arrange
      const refreshToken = 'INVALID_REFRESH_TOKEN_FOR_LOGOUT'

      //  action
      const response = await server.post('/auth/logout').send({
        refreshToken
      })

      //  assertion
      expect(response.status).toBe(404)
    })
  })
})
