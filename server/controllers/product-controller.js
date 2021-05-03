const { Product, Category } = require('../models')

class ProductController {
  static create = async (req, res, next) => {
    try {
      const { name, image_url, price, stock } = req.body

      // find or create category when exist in req.body
      let CategoryId
      if (req.body.category) {
        const [category, ..._] = await Category.findOrCreate({
          where: { name: req.body.category },
          defaults: { name: req.body.category },
        })
        CategoryId = category.id
      } else CategoryId = undefined

      const product = await Product.create({
        name,
        image_url,
        price,
        stock,
        CategoryId,
      })
      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }
  static readAll = async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: Category,
      })
      res.status(200).json(products)
    } catch (error) {
      next(error)
    }
  }
  static readOne = async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
  static update = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, image_url, price, stock } = req.body

      // find or create category when exist in req.body
      let CategoryId
      if (req.body.category) {
        const [category, ..._] = await Category.findOrCreate({
          where: { name: req.body.category.toLowerCase() },
          defaults: { name: req.body.category.toLowerCase() },
        })
        CategoryId = category.id
      } else CategoryId = undefined

      const [_, [product, ...others]] = await Product.update(
        {
          name,
          image_url,
          price,
          stock,
          CategoryId,
        },
        { where: { id }, individualHooks: true, plain: true },
      )
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
  static updateStock = async (req, res, next) => {
    try {
      const { id } = req.params
      const { stock } = req.body
      const [_, [product, ...others]] = await Product.update(
        { stock },
        { where: { id }, individualHooks: true, plain: true },
      )
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
  static delete = async (req, res, next) => {
    try {
      const { id } = req.params
      await Product.destroy({ where: { id } })
      res.status(200).json({ message: 'product deletion is successful' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { ProductController }
