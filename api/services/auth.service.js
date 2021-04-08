const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userService = require('../services/user.service')
const config = require('../config')

exports.login = async ({ username, password }) => {
  const user = await userService.getOne({ username })

  const valid = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!valid) {
    const error = new Error('Invalid credentials')
    error.name = 'ValidationError'
    throw error
  }

  const token = jwt.sign({ id: user.id }, config.SECRET, { expiresIn: 60 * 60 })

  return token
}
