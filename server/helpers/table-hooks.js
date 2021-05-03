const { User } = require('../models')
const { admin, customer } = require('../data/users')
module.exports = {
  populateAdmin: async () => {
    try {
      await User.destroy({ where: {} })
      await User.create({ ...admin })
    } catch (error) {
      console.error(error)
    }
  },
  populateUsers: async () => {
    try {
      await User.destroy({ where: {} })
      await User.create({ ...admin })
      await User.create({ ...customer })
    } catch (error) {
      console.error(error)
    }
  },
}
