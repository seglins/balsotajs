const router = require('express').Router()
const controller = require('../controllers/auth.controller')
const { requireAuth, clientIp, accessLogger } = require('../middleware')

router.post('/', [clientIp, accessLogger], controller.login)
router.get('/', [clientIp, accessLogger, requireAuth], (req, res) =>
  res.status(200).end()
)

module.exports = router
