const { Banner } = require('../models')

class BannerController {
  static create = async (req, res, next) => {
    try {
      const { title, status, image_url } = req.body

      const banner = await Banner.create({ title, status, image_url })

      res.status(201).json(banner)
    } catch (error) {
      next(error)
    }
  }
  static readAll = async (req, res, next) => {
    try {
      const banners = await Banner.findAll({ order: [['createdAt', 'DESC']] })

      res.status(200).json(banners)
    } catch (error) {
      next(error)
    }
  }
  static readOne = async (req, res, next) => {
    try {
      const banner = await Banner.findByPk(req.params.id)

      res.status(200).json(banner)
    } catch (error) {
      next(error)
    }
  }

  static update = async (req, res, next) => {
    try {
      const { id } = req.params
      const { title, image_url } = req.body

      const [_, [banner]] = await Banner.update(
        {
          title,
          image_url,
        },
        { where: { id }, individualHooks: true, plain: true },
      )

      res.status(200).json(banner)
    } catch (error) {
      next(error)
    }
  }

  static updateStatus = async (req, res, next) => {
    try {
      const { id } = req.params
      const { status } = req.body

      const [_, [banner]] = await Banner.update(
        {
          status,
        },
        { where: { id }, individualHooks: true, plain: true },
      )

      res.status(200).json(banner)
    } catch (error) {
      next(error)
    }
  }
  static delete = async (req, res, next) => {
    try {
      const { id } = req.params

      await Banner.destroy({ where: { id } })

      res.status(200).json({ message: 'banner deletion is successful' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { BannerController }
