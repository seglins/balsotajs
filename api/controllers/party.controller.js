const partyService = require('../services/party.service')

exports.get = (req, res, next) => {
  if (req.params.id) {
    partyService
      .getOne(req.params.id, 'votes')
      .then((party) => res.status(200).json(party))
      .catch((error) => next(error))
  } else {
    partyService
      .get({}, 'votes')
      .then((parties) => res.status(200).json(parties))
      .catch((error) => next(error))
  }
}

exports.create = (req, res, next) => {
  partyService
    .createOne(req.body)
    .then((party) => res.status(201).json(party))
    .catch((error) => next(error))
}

exports.update = (req, res, next) => {
  partyService
    .updateOne(req.params.id, req.body)
    .then((party) => res.status(200).json(party))
    .catch((error) => next(error))
}

exports.delete = (req, res, next) => {
  partyService
    .deleteOne(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
}

exports.addEvent = (req, res, next) => {
  partyService
    .addEvent(req.params.id, req.body)
    .then((party) => res.status(200).json(party))
    .catch((error) => next(error))
}
