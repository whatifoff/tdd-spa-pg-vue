const server = require('../utils')

describe('Работает ли сервер', () => {
  test('Возвращает код 200 при обращении на "/"', async () => {
    const response = await server.get('/')

    expect(response.status).toBe(200)
  });

  test('Возвращает код 404 при обращении на несуществующий адрес', async () => {
    const response = await server.get('/badpage')

    expect(response.status).toBe(404)
  });

  // test('При обращении на главную сервер должен отдавать страницу', async () => {
  //   const response = await server.get('/')
  //   expect(response.status).toBe(200)
  //   expect(response.text).toContain('Welcome');
  // });
});