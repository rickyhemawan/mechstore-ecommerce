'use strict'
const { Model } = require('sequelize')
const { compare, encrypt } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Wishlist)
      User.hasMany(models.Cart)
    }

    toPlainData() {
      const { id, name, email, role } = this
      return { id, name, email, role }
    }
    toJwt() {
      return sign({ ...this.toPlainData() })
    }
    toCredentials() {
      return { ...this.toPlainData(), access_token: this.toJwt() }
    }
    comparePassword(password) {
      return compare(password, this.password)
    }
    encryptPassword() {
      this.password = encrypt(this.password)
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'email cannot be empty' },
          notEmpty: { msg: 'email cannot be empty' },
          isEmail: { msg: 'invalid email address' },
        },
        unique: { msg: 'email already exist' },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'name cannot be empty' },
          notEmpty: { msg: 'name cannot be empty' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'password cannot be empty' },
          notEmpty: { msg: 'password cannot be empty' },
          len: { args: [6], msg: 'password must be higher than 6 characters' },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'customer',
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          let role = user.role.toLowerCase().trim()
          if (role !== 'admin') role = 'customer'
          user.role = role
          user.encryptPassword()
        },
      },
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
