const userService = require('../services/user.service')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = async (req, res, next) => {
  if (req.token) {
    let decodedToken = jwt.verify(req.token, config.SECRET)
    if (!decodedToken) next()
    const user = await userService.getOne(decodedToken.id)
    req.user = user
  }

  next()
}