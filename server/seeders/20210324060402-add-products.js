'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = require('../data/products')
    await queryInterface.bulkInsert('Products', products, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  },
}
