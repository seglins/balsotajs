const userService = require('../services/user.service')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = async (req, res, next) => {
  try {
    const decodedToken = await jwt.verify(req.token, config.SECRET)
    const user = await userService.getOne(decodedToken.id)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}