'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category)
      Product.hasMany(models.Wishlist)
      Product.hasMany(models.Cart)
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'name cannot be empty' },
          notEmpty: { msg: 'name cannot be empty' },
        },
      },
      image_url: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: { msg: 'price must be an integer' },
          min: { args: [0], msg: 'price must be a positive integer' },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: { msg: 'stock must be an integer' },
          min: { args: [0], msg: 'stock must be a positive integer' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  )
  return Product
}
