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

  });

});