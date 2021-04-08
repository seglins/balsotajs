const path = require('path')

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
})

const ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const TIMEZONE = process.env.TIMEZONE

module.exports = {
  ENV,
  PORT,
  MONGODB_URI,
  SECRET,
  TIMEZONE,
}
