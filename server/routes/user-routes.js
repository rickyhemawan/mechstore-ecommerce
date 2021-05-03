const { UserController } = require('../controllers')
const { authentication } = require('../middlewares/user-middleware')

const userRoutes = require('express').Router()
userRoutes.post('/register', UserController.register)
userRoutes.post('/login', UserController.login)
userRoutes.get('/user', authentication, UserController.index)

module.exports = { userRoutes }
