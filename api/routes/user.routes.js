const router = require('express').Router()
const controller = require('../controllers/user.controller')
const { clientIp, accessLogger } = require('../middleware')

router.post('/', [clientIp, accessLogger], controller.create)

module.exports = router