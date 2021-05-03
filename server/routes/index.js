const { authentication } = require('../middlewares/user-middleware')
const { bannerRoutes } = require('./banner-routes')
const { cartRoutes } = require('./cart-routes')
const { categoryRoutes } = require('./category-routes')
const { productRoutes } = require('./product-routes')
const { userRoutes } = require('./user-routes')
const { wishlistRoutes } = require('./wishlist-routes')

const router = require('express').Router()

router.use('/', userRoutes)
router.use(authentication)
router.use('/products', productRoutes)
router.use('/banners', bannerRoutes)
router.use('/categories', categoryRoutes)
router.use('/wishlists', wishlistRoutes)
router.use('/carts', cartRoutes)

module.exports = router
