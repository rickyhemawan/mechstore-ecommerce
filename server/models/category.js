'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product)
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'name cannot be empty' },
          notEmpty: { msg: 'name cannot be empty' },
        },
        unique: { msg: 'name must be unique' },
      },
    },
    {
      hooks: {
        beforeCreate: (category) =>
          (category.name = category.name.toLowerCase()),
      },
      sequelize,
      modelName: 'Category',
    },
  )
  return Category
}
