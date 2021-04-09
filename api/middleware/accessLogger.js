const winston = require('winston')
const { TIMEZONE } = require('../config')
const { DateTime } = require('luxon')

const level = 'info'
const format = winston.format.json()
const transports = [
  new winston.transports.File({
    filename: `logs/${DateTime.now()
      .setZone(TIMEZONE)
      .toFormat('yyyy-LL')}.access.log`,
  }),
]

const logger = winston.createLogger({ level, format, transports })

module.exports = (req, res, next) => {
  let request = {
    method: req.method.toUpperCase(),
    path: req.originalUrl,
    body: req.body,
  }

  if (req.clientIp) request.ip = req.clientIp

  const now = DateTime.now().setZone(TIMEZONE)
  const time = now.toFormat('HH:mm:ss')
  const date = now.toFormat('dd.LL.yyyy')

  logger.log({ level, date, time, request })

  next()
}
