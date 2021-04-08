const config = require('../config')
const { DateTime } = require('luxon')

const now = () => DateTime.now().setZone(config.TIMEZONE)

const ISO = () => now().toISO()

const year = () => now().toFormat('yyyy')

const hoursPassed = (date) => {
  const end = DateTime.fromISO(now().toISO())
  const start = DateTime.fromISO(date)
  const diff = end.diff(start, 'hours')
  return diff.toObject().hours
}

module.exports = {
  DateTime,
  now,
  ISO,
  year,
  hoursPassed
}