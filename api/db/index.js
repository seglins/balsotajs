const mongoose = require('mongoose')
const config = require('../config')

const connect = () => {
  return mongoose
    .connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log(`Connected to ${config.ENV} database!`))
    .catch(error => console.error(error))
}

module.exports = {
  connect
}
