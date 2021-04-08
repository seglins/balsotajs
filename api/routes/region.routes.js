const router = require('express').Router()
const controller = require('../controllers/region.controller')
const { requireAuth } = require('../middleware')

router.get(['/', '/:id'], controller.get)
router.post('/', requireAuth, controller.create)
router.put('/:id', requireAuth, controller.update)
router.delete('/:id', requireAuth, controller.delete)
// router.post('/:id/party', requireAuth, controller.addParty)

module.exports = router