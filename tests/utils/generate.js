const faker = require('faker')

module.exports = {
  generateUser() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  }
}