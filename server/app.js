const env = process.env.NODE_ENV

if (env === 'development' || env === 'test') {
  require('dotenv').config()
}
const express = require('express')
var cors = require('cors')
const errorHandler = require('./middlewares/error-handler')
const routes = require('./routes')
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routes)

app.use(errorHandler)

module.exports = { app }
