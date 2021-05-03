const { NamedError } = require('../helpers/error-formatter')
const { User } = require('../models')
class UserController {
  static index = async (req, res, next) => {
    try {
      const { id, email } = req.loggedUser
      const user = await User.findOne({
        where: { id, email },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      })
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body
      const user = await User.create({ name, email, password })
      res.status(201).json(user.toPlainData())
    } catch (error) {
      next(error)
    }
  }
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (!email || !password) throw NamedError.BAD_LOGIN
      const user = await User.findOne({ where: { email } })
      if (!user) throw NamedError.LOGIN
      if (!user.comparePassword(password)) throw NamedError.LOGIN

      res.status(200).json(user.toCredentials())
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { UserController }
