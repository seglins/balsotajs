const voteService = require('../services/vote.service')

exports.get = (req, res, next) => {
  voteService
    .get()
    .then((votes) => res.status(200).json(votes))
    .catch((error) => next(error))
}

exports.create = (req, res, next) => {
  voteService
    .createOne({ ...req.body, ip: req.clientIp })
    .then((vote) => res.status(200).json(vote))
    .catch((error) => next(error))
}
