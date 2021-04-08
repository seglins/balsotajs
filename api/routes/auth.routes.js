const router = require('express').Router()
const controller = require('../controllers/auth.controller')
const { requireAuth } = require('../middleware')

router.post('/', controller.login)
router.get('/', requireAuth, (req, res) => res.status(200).end())

module.exports = router