const { WishlistController } = require('../controllers')
const { authorization } = require('../middlewares/wishlist-middleware')

const wishlistRoutes = require('express').Router()

wishlistRoutes.get('/', WishlistController.readAll)
wishlistRoutes.post('/:productId', WishlistController.create)
wishlistRoutes.delete('/:id', authorization, WishlistController.delete)

module.exports = { wishlistRoutes }
