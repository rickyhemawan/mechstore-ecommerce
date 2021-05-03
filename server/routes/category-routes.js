const { CategoryController } = require('../controllers')

const categoryRoutes = require('express').Router()

categoryRoutes.get('/', CategoryController.readAll)

module.exports = { categoryRoutes }
