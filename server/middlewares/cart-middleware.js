const { NamedError } = require('../helpers/error-formatter')
const { Cart } = require('../models')

module.exports = {
  authorization: async (req, res, next) => {
    try {
      const UserId = req.loggedUser.id
      const { id } = req.params

      const cart = await Cart.findByPk(id)
      if (!cart) throw NamedError.NOT_FOUND

      if (UserId !== cart.UserId) throw NamedError.AUTHORIZATION

      next()
    } catch (error) {
      next(error)
    }
  },
}
