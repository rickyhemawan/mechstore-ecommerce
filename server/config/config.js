const env = process.env.NODE_ENV

if (env === 'development' || env === 'test') {
  require('dotenv').config()
}

const status = env.toUpperCase()

const setup = {
  username: process.env[`DB_USERNAME_${status}`],
  password: process.env[`DB_PASSWORD_${status}`],
  database: process.env[`DB_DATABASE_${status}`],
  host: process.env[`DB_HOST_${status}`],
  dialect: process.env[`DB_DIALECT_${status}`],
}

module.exports = {
  development: setup,
  test: { ...setup, logging: false },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
}
