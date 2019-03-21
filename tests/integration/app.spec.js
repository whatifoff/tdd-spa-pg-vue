const supertest = require('supertest')
const app = require('../../index')
const server = supertest(app)

describe('Работает ли сервер', () => {
  test('Возвращает код 200 при обращении на "/"', async () => {
    const response = await server.get('/')

    expect(response.status).toBe(200)
  });
});