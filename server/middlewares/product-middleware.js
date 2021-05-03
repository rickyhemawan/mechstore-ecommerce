const { NamedError } = require('../helpers/error-formatter')
const { Product } = require('../models')
module.exports = {
  exist: async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) throw NamedError.NOT_FOUND

      next()
    } catch (error) {
      next(error)
    }
  },
}
