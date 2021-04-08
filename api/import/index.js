require('dotenv').config()

const db = require('../db')
const env = process.env.NODE_ENV

db.connect().then(() => {
  if (env === 'development') require('./development')()
})
