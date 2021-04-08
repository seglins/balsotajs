const Page = require('../models/page.model')
const baseService = require('./base.service')(Page)

const createOne = async (data) => {
  if (!data.title) {
    const error = new Error('Title is missing')
    error.name = 'ValidationError'
    throw error
  }

  try {
    return await baseService.createOne(data)
  } catch (error) {
    throw error
  }
}

const updateOne = async (id, data) => {
  try {
    const page = await baseService.updateOne(id, data)
    if (page) return page
    const error = new Error('Page not found')
    error.name = 'NotFoundError'
    throw error
  } catch (error) {
    throw error
  }
}

module.exports = {
  ...baseService,
  createOne,
  updateOne
}