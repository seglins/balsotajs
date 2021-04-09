const router = require('express').Router()
const controller = require('../controllers/page.controller')

const {
  requireAuth,
  checkAuth,
  clientIp,
  accessLogger,
} = require('../middleware')

router.get(['/', '/:id'], checkAuth, controller.get)
router.post('/', [clientIp, accessLogger, requireAuth], controller.create)
router.put('/:id', [clientIp, accessLogger, requireAuth], controller.update)
router.delete('/:id', [clientIp, accessLogger, requireAuth], controller.delete)

module.exports = router
