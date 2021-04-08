const regionService = require('../services/region.service')

exports.get = (req, res, next) => {
  if (req.params.id) {
    regionService
      .getOne(req.params.id, { path: 'parties', select: 'id name slug created' })
      .then((region) => res.status(200).json(region))
      .catch((error) => next(error))
  } else {
    regionService
      .get({}, { path: 'parties', select: 'id name slug created' })
      .then((regions) => res.status(200).json(regions))
      .catch((error) => next(error))
  }
}

exports.create = (req, res, next) => {
  regionService
    .createOne(req.body)
    .then((region) => res.status(201).json(region))
    .catch((error) => next(error))
}

exports.update = (req, res, next) => {
  regionService
    .updateOne(req.params.id, req.body)
    .then((region) => res.status(200).json(region))
    .catch((error) => next(error))
}

exports.delete = (req, res, next) => {
  regionService
    .deleteOne(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
}

exports.addParty = (req, res, next) => {
  regionService
    .addParty(req.params.id, req.body)
    .then((region) => res.status(201).json(region))
    .catch((error) => next(error))
}
