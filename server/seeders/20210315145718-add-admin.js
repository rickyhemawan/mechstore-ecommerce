'use strict'
const { admin } = require('../data/users')
const { encrypt } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seed = { ...admin }
    seed.createdAt = new Date()
    seed.updatedAt = new Date()
    seed.password = encrypt(admin.password)
    await queryInterface.bulkInsert('Users', [seed])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
