const dbUser = require('../../db/user')
const midwValidator = require('../../middleware/validator')
const gen = require('../utils/generate')

describe('Валидатор', () => {

  describe('Валидатор email', () => {

    test('email отсутствует', async () => {
      const req = {
        body: {}
      }
      const res = {}
      const next = jest.fn()

      try {
        await midwValidator.validateEmail(req, res, next)
      } catch (error) {
        expect(error.message).toBe('Email is required.')
      }
    });

    test('email не корректный', async () => {
      const req = {
        body: {
          email: 'email'
        }
      }
      const res = {}
      const next = jest.fn()

      try {
        await midwValidator.validateEmail(req, res, next)
      } catch (error) {
        expect(error.message).toBe('Email is not valid.')
      }
    });

    test('email уже есть в БД', async () => {
      const fakeUser = gen.generateUser()
      const req = {
        body: fakeUser
      }
      const res = {}
      const next = jest.fn()

      try {
        await dbUser.add(fakeUser.email, '')
        await midwValidator.validateEmail(req, res, next)
      } catch (error) {
        expect(error.message).toBe('Email dublicate.')
      }
    });

    test('Корректный email', async () => {
      const fakeUser = gen.generateUser()
      const req = {
        body: fakeUser
      }
      const res = {}
      const next = jest.fn()

      await midwValidator.validateEmail(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(next).toHaveBeenCalledTimes(1)
    });
  });


  describe('Упрощенный валидатор email', () => {
    test('Корректный email', async () => {
      const fakeUser = gen.generateUser()
      const req = {
        body: fakeUser
      }
      const res = {}
      const next = jest.fn()

      await midwValidator.validateEmailSimple(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(next).toHaveBeenCalledTimes(1)
    });

    test('email отсутствует', async () => {
      const req = {
        body: {}
      }
      const res = {}
      const next = jest.fn()

      try {
        await midwValidator.validateEmailSimple(req, res, next)
      } catch (error) {
        expect(error.message).toBe('Email is required.')
      }
    });

    test('email не корректный', async () => {
      const req = {
        body: {
          email: 'email'
        }
      }
      const res = {}
      const next = jest.fn()

      try {
        await midwValidator.validateEmailSimple(req, res, next)
      } catch (error) {
        expect(error.message).toBe('Email is not valid.')
      }
    });

  });


  describe('Валидатор пароля', () => {
    test('Пароль обязателен', () => {
      const { email } = gen.generateUser()
      const req = {
        body: {
          email
        }
      }
      const res = {}
      const next = jest.fn()

      try {
        midwValidator.validatePassword(req, res, next)
      } catch (error) {
        expect(error.message).toBe('Password is required.')
      }
    });

    test('Длина пароля должна быть не менее 8 символов', () => {
      const { email } = gen.generateUser()
      const req = {
        body: {
          email,
          password: '12345'
        }
      }
      const res = {}
      const next = jest.fn()

      try {
        midwValidator.validatePassword(req, res, next)
      } catch (error) {
        expect(error.message).toBe('Password length must be geater 8 symbols.')
      }
    })

    test('Правильный пароль - возврат next()', () => {
      const { email, password } = gen.generateUser()
      const req = {
        body: {
          email,
          password
        }
      }
      const res = {}
      const next = jest.fn()

      midwValidator.validatePassword(req, res, next)
      expect(next).toHaveBeenCalled()

    })
  });
});