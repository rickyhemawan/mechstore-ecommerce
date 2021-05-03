const { Wishlist } = require('../models')

class WishlistController {
  static readAll = async (req, res, next) => {
    try {
      const UserId = req.loggedUser.id
      const wishlists = await Wishlist.findAll({ where: { UserId } })
      res.status(200).json(wishlists)
    } catch (error) {
      next(error)
    }
  }
  static create = async (req, res, next) => {
    try {
      const ProductId = req.params.productId
      const UserId = req.loggedUser.id
      const wishlist = await Wishlist.create({ ProductId, UserId })
      res.status(201).json(wishlist)
    } catch (error) {
      next(error)
    }
  }
  static delete = async (req, res, next) => {
    try {
      const { id } = req.params
      await Wishlist.destroy({ where: { id } })
      res.status(200).json({ message: 'wishlist deletion is successful' })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = { WishlistController }
