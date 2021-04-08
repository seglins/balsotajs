const authService = require('../services/auth.service')

exports.login = (req, res, next) => {
  authService
    .login(req.body)
    .then((token) => res.status(200).json({ token }))
    .catch((error) => next(error))
}
