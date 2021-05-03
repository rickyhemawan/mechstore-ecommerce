'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = require('../data/categories')
    await queryInterface.bulkInsert('Categories', categories, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  },
}
