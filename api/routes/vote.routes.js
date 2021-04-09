const router = require('express').Router()
const controller = require('../controllers/vote.controller')
const { requireAuth, clientIp, accessLogger } = require('../middleware')

router.get('/', [clientIp, accessLogger, requireAuth], controller.get)
router.post('/', clientIp, controller.create)

module.exports = router