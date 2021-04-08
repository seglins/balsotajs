const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const baseService = require('./base.service')(User)

const createOne = async ({ username, password }) => {
  const error = new Error()
  error.name = 'ValidationError'

  if (!username) {
    error.message = 'Username is required'
    throw error
  }

  if (!password) {
    error.message = 'Password is required'
    throw error
  }

  if (password.length < 8) {
    error.message = 'Password must be at least 8 characters long'
    throw error
  }

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    return await baseService.createOne({ username, passwordHash })
  } catch (error) {
    throw error
  }
}

module.exports = {
  ...baseService,
  createOne,
}
