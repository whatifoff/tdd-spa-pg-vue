const supertest = require('supertest')
const app = require('../../index')
const server = supertest(app)

module.exports = server