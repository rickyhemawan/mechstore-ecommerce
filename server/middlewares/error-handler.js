const { NamedError } = require('../helpers/error-formatter')

module.exports = (err, req, res, next) => {
  let status, message

  switch (err.name) {
    case NamedError.BAD_LOGIN.name:
      status = 400
      message = ['email or password cannot be empty']
      break
    case NamedError.USER_EXIST.name:
      status = 400
      message = ['email already exist']
      break
    case NamedError.LOGIN.name:
      status = 401
      message = ['invalid email or password']
      break
    case 'JsonWebTokenError':
    case NamedError.AUTHENTICATION.name:
      status = 401
      message = ['user not authenticated']
      break
    case NamedError.AUTHORIZATION.name:
      status = 401
      message = ['user not authorized']
      break
    case NamedError.NOT_FOUND.name:
      status = 404
      message = ['data not found']
      break
    case NamedError.NO_STOCK.name:
      status = 400
      message = ['stock not available for some products']
      break
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError':
      status = 400
      message = err.errors.map((e) => e.message)
      break
    default:
      status = 500
      message = ['internal server error']
      console.error(err)
      console.log(err.name)
      break
  }

  res.status(status).json({ message })
}
