'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const banners = require('../data/banners')
    await queryInterface.bulkInsert('Banners', banners, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banners', null, {})
  },
}
