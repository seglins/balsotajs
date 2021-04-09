const Vote = require('../models/vote.model')
const baseService = require('./base.service')(Vote)
const partyService = require('./party.service')
const regionService = require('./region.service')

const createOne = async (data) => {
  const error = new Error()
  error.name = 'ValidationError'

  const pastDay = new Date()
  pastDay.setHours(pastDay.getHours() - 24)

  if (data.ip) {
    const existingVote = await baseService.getOne({
      ip: data.ip,
      created: { $gte: pastDay },
    })

    if (existingVote) {
      error.message = 'IP address has already been used to vote within last 24 hours'
      throw error
    }
  } else {
    error.message = 'IP address is missing'
    throw error
  }

  if (!data.birthYear) {
    error.message = 'Birth year is missing'
    throw error
  }

  if (
    !Number.isInteger(parseInt(data.birthYear)) ||
    String(data.birthYear).length !== 4
  ) {
    error.message = 'Invalid birth year'
    throw error
  }

  if (!data.gender) {
    error.message = 'Gender is missing'
    throw error
  }

  if (!data.region) {
    error.message = 'Region ID is missing'
    throw error
  }

  if (!data.party) {
    error.message = 'Party ID is missing'
    throw error
  }

  try {
    let region = await regionService.getOne(data.region)
    let party = await partyService.getOne(data.party)

    error.name = 'NotFoundError'

    if (!region) {
      error.message = 'Region does not exist'
      throw error
    }

    if (!party || !region.parties.includes(data.party)) {
      error.message = 'Party does not exist'
      throw error
    }

    const vote = await baseService.createOne(data)
    const votes = party.votes.concat(vote)
    await partyService.updateOne(data.party, { votes })

    const partiesWithinRegion = []

    region = await regionService.getOne(data.region, 'parties')

    for (let party of region.parties) {
      const count = await baseService.getCount({
        party: party.id,
        region: data.region,
        created: { $gte: pastDay },
      })

      partiesWithinRegion.push({
        id: party.id,
        name: party.name,
        slug: party.slug,
        color: party.color,
        voteCountLast24Hours: count,
      })
    }

    const events = party.events

    return {
      vote,
      partiesWithinRegion,
      events,
    }
  } catch (error) {
    throw error
  }
}

const get = async () => {
  try {
    return await baseService.get({}, [
      { path: 'party', select: 'id color name slug' },
      { path: 'region', select: 'id name slug' },
    ])
  } catch (error) {
    throw error
  }
}

module.exports = {
  ...baseService,
  createOne,
  get,
}
