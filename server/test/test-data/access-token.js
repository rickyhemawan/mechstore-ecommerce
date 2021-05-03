const { customer, admin } = require('../../data/users')
const { sign } = require('../../helpers/jwt')
const tokenGenerator = (obj, id) => {
  const { password, ...rest } = obj
  return sign({ id, ...rest })
}
module.exports = {
  admin_token: tokenGenerator(admin, 1),
  customer_token: tokenGenerator(customer, 2),
}
