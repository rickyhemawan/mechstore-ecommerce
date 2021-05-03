const errorWithName = (name) => {
  const error = new Error()
  error.name = name
  return error
}

module.exports = {
  NamedError: {
    BAD_LOGIN: errorWithName('BadLoginError'),
    LOGIN: errorWithName('LoginError'),
    NOT_FOUND: errorWithName('NotFoundError'),
    AUTHENTICATION: errorWithName('AuthenticationError'),
    AUTHORIZATION: errorWithName('AuthorizationError'),
    USER_EXIST: errorWithName('UserExistError'),
    NO_STOCK: errorWithName('NoStockError'),
  },
}
