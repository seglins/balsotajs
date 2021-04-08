const router = require('express').Router()
const controller = require('../controllers/page.controller')
const { requireAuth, checkAuth } = require('../middleware')

router.get(['/', '/:id'], checkAuth, controller.get)
router.post('/', requireAuth, controller.create)
router.put('/:id', requireAuth, controller.update)
router.delete('/:id', requireAuth, controller.delete)

module.exports = router