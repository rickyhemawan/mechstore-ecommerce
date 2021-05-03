const { BannerController } = require('../controllers')
const { exist } = require('../middlewares/banner-middleware')
const { authorization } = require('../middlewares/user-middleware')

const bannerRoutes = require('express').Router()

bannerRoutes
  .route('/')
  .post(authorization, BannerController.create)
  .get(BannerController.readAll)
bannerRoutes
  .route('/:id')
  .get(exist, BannerController.readOne)
  .put(authorization, exist, BannerController.update)
  .patch(authorization, exist, BannerController.updateStatus)
  .delete(authorization, exist, BannerController.delete)

module.exports = { bannerRoutes }
