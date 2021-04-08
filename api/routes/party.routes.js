const router = require('express').Router()
const controller = require('../controllers/party.controller')
const { requireAuth } = require('../middleware')

router.get(['/', '/:id'], requireAuth, controller.get)
router.post('/', requireAuth, controller.create)
router.put('/:id', requireAuth, controller.update)
router.delete('/:id', requireAuth, controller.delete)
// router.post('/:id/event', requireAuth, controller.addEvent)

module.exports = router