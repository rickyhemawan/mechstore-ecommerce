const { NamedError } = require('../helpers/error-formatter')
const { Banner } = require('../models')
module.exports = {
  exist: async (req, res, next) => {
    try {
      const { id } = req.params
      const banner = await Banner.findByPk(id)
      if (!banner) throw NamedError.NOT_FOUND

      next()
    } catch (error) {
      next(error)
    }
  },
}
