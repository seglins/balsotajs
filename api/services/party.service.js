const Party = require('../models/party.model')
const baseService = require('./base.service')(Party)

const createOne = async (data) => {
  if (!data.name) {
    const error = new Error('Name is missing')
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
    const party = await baseService.updateOne(id, data)
    if (party) return party
    const error = new Error('Party not found')
    error.name = 'NotFoundError'
    throw error
  } catch (error) {
    throw error
  }
}

// const addEvent = async (id, { event }) => {
//   try {
//     const region = await baseService.getOne(id)

//     if (!region) {
//       const error = new Error()
//       error.message = 'Party does not exist'
//       error.name = 'NotFoundError'
//       throw error
//     }

//     await baseService.updateOne(id, region.events.concat(event))
//   } catch (error) {
//     throw error
//   }
// }

module.exports = {
  ...baseService,
  createOne,
  updateOne
}