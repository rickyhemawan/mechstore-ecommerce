const { NamedError } = require('../helpers/error-formatter')
const { Cart, Product } = require('../models')

class CartController {
  // stock calculation and validation at checkout
  static addCart = async (req, res, next) => {
    try {
      const UserId = req.loggedUser.id
      const ProductId = req.params.productId
      const product = await Product.findByPk(ProductId)

      if (!product) throw NamedError.NOT_FOUND

      const { qty } = req.body
      const foundCart = await Cart.findOne({ where: { UserId, ProductId } })
      if (foundCart) {
        foundCart.qty += +qty
        foundCart.save()
        res.status(201).json(foundCart)
        return
      }
      const cart = await Cart.create({ UserId, ProductId, qty })
      res.status(201).json(cart)
    } catch (error) {
      next(error)
    }
  }
  static readCart = async (req, res, next) => {
    try {
      const UserId = req.loggedUser.id
      const carts = await Cart.findAll({
        where: { UserId },
        include: Product,
      })
      res.status(200).json(carts)
    } catch (error) {
      next(error)
    }
  }
  static updateQty = async (req, res, next) => {
    try {
      const { id } = req.params
      const cart = await Cart.findByPk(id)
      cart.qty = +req.body.qty
      cart.save()
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
  static deleteAll = async (req, res, next) => {
    try {
      const UserId = req.loggedUser.id
      await Cart.destroy({ where: { UserId } })
      res.status(200).json({ message: 'successfully removed cart' })
    } catch (error) {
      next(error)
    }
  }
  static deleteOne = async (req, res, next) => {
    try {
      const { id } = req.params
      await Cart.destroy({ where: { id } })
      res
        .status(200)
        .json({ message: 'successfully delete one product in cart' })
    } catch (error) {
      next(error)
    }
  }

  static checkout = async (req, res, next) => {
    try {
      const UserId = req.loggedUser.id
      const carts = await Cart.findAll({ where: { UserId } })
      const products = await Product.findAll()
      await products.forEach(async (product) => {
        await carts.forEach(async (cart) => {
          if (cart.ProductId !== product.id) return
          if (cart.qty > product.stock) throw NamedError.NO_STOCK
          product.stock -= cart.qty
          await product.save()
        })
      })

      await Cart.destroy({ where: { UserId } })
      res.status(200).json({ message: 'successfully checked out' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { CartController }
