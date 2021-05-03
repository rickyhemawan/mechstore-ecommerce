'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Banner.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'title cannot be empty',
          },
          notNull: {
            msg: 'title cannot be empty',
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'image url cannot be empty',
          },
          notNull: {
            msg: 'image url cannot be empty',
          },
          isUrl: {
            msg: 'image must be an url',
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Banner',
    },
  )
  return Banner
}
