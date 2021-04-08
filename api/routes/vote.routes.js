const router = require('express').Router()
const controller = require('../controllers/vote.controller')
const { requireAuth } = require('../middleware')

router.get(['/', '/:regionId', '/:regionId/:partyId'], requireAuth, controller.get)
router.post('/', controller.create)

module.exports = router