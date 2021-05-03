const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const sign = (payload) => {
  return jwt.sign(payload, secret)
}

const verify = (token) => {
  return jwt.verify(token, secret)
}

module.exports = { sign, verify }
