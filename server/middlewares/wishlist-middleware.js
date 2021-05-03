const { NamedError } = require('../helpers/error-formatter')
const { Wishlist } = require('../models')

module.exports = {
  authorization: async (req, res, next) => {
    try {
      const UserId = req.loggedUser.id
      const { id } = req.params

      const wishlist = await Wishlist.findByPk(id)
      if (!wishlist) throw NamedError.NOT_FOUND

      if (UserId !== wishlist.UserId) throw NamedError.AUTHORIZATION

      next()
    } catch (error) {
      next(error)
    }
  },
}
