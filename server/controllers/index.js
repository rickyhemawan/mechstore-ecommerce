const { BannerController } = require('./banner-controller')
const { CartController } = require('./cart-controller')
const { CategoryController } = require('./category-controller')
const { ProductController } = require('./product-controller')
const { UserController } = require('./user-controller')
const { WishlistController } = require('./wishlist-controller')

module.exports = {
  UserController,
  ProductController,
  BannerController,
  CategoryController,
  WishlistController,
  CartController,
}
