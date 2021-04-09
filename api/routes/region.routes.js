const router = require('express').Router()
const controller = require('../controllers/region.controller')
const { requireAuth, clientIp, accessLogger } = require('../middleware')

router.get(['/', '/:id'], controller.get)
router.post('/', [clientIp, accessLogger, requireAuth], controller.create)
router.put('/:id', [clientIp, accessLogger, requireAuth], controller.update)
router.delete('/:id', [clientIp, accessLogger, requireAuth], controller.delete)
// router.post('/:id/party', [clientIp, accessLogger, requireAuth], controller.addParty)

module.exports = router