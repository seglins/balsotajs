const router = require('express').Router()
const controller = require('../controllers/party.controller')
const { requireAuth, clientIp, accessLogger } = require('../middleware')

router.get(['/', '/:id'], [clientIp, accessLogger, requireAuth], controller.get)
router.post('/', [clientIp, accessLogger, requireAuth], controller.create)
router.put('/:id', [clientIp, accessLogger, requireAuth], controller.update)
router.delete('/:id', [clientIp, accessLogger, requireAuth], controller.delete)
// router.post('/:id/event', [clientIp, accessLogger, requireAuth], controller.addEvent)

module.exports = router
