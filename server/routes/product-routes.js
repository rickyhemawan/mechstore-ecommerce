const { ProductController } = require('../controllers')
const { exist } = require('../middlewares/product-middleware')
const { authorization } = require('../middlewares/user-middleware')

const productRoutes = require('express').Router()

productRoutes
  .route('/')
  .post(authorization, ProductController.create)
  .get(ProductController.readAll)

productRoutes
  .route('/:id')
  .get(exist, ProductController.readOne)
  .put(authorization, exist, ProductController.update)
  .patch(authorization, exist, ProductController.updateStock)
  .delete(authorization, exist, ProductController.delete)

module.exports = { productRoutes }
