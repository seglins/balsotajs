const requestIp = require('request-ip')

module.exports = (req, res, next) => {
  req.clientIp = requestIp.getClientIp(req)
  next()
}
