const { CartController } = require('../controllers')
const { authorization } = require('../middlewares/cart-middleware')

const cartRoutes = require('express').Router()

cartRoutes
  .route('/')
  .get(CartController.readCart)
  .delete(CartController.deleteAll)

cartRoutes.post('/checkout', CartController.checkout)

cartRoutes.post('/:productId', CartController.addCart)

cartRoutes
  .route('/:id')
  .delete(authorization, CartController.deleteOne)
  .patch(authorization, CartController.updateQty)

module.exports = { cartRoutes }
