const bcrypt = require('bcrypt')
const userService = require('../services/user.service')

exports.create = async (req, res, next) => {
  userService.createOne(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error))
}