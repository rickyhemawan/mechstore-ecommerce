const { Category } = require('../models')
class CategoryController {
  static readAll = async (req, res, next) => {
    try {
      const categories = await Category.findAll()
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { CategoryController }
