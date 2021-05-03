const { NamedError } = require('../helpers/error-formatter')
const { verify } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
  authentication: async (req, res, next) => {
    try {
      const { access_token } = req.headers
      if (!access_token) throw NamedError.AUTHENTICATION

      const { id, email } = verify(access_token)
      if (!email) throw NamedError.AUTHENTICATION
      const user = await User.findOne({ where: { id, email } })
      if (!user) throw NamedError.AUTHENTICATION
      req.loggedUser = user

      next()
    } catch (error) {
      next(error)
    }
  },
  authorization: async (req, res, next) => {
    try {
      if (!req.loggedUser) throw NamedError.AUTHENTICATION
      const { role } = req.loggedUser
      if (role !== 'admin') throw NamedError.AUTHORIZATION

      next()
    } catch (error) {
      next(error)
    }
  },
}
