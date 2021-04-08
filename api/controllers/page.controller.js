const pageService = require('../services/page.service')

exports.get = (req, res, next) => {
  const filter = (req.user) ? {} : { isPublic: true }
  if (req.params.id) {
    pageService
      .getOne(req.params.id, filter)
      .then((page) => res.status(200).json(page))
      .catch((error) => next(error))
  } else {
    pageService
      .get(filter)
      .then((pages) => res.status(200).json(pages))
      .catch((error) => next(error))
  }
}

exports.create = (req, res, next) => {
  pageService
    .createOne(req.body)
    .then((page) => res.status(201).json(page))
    .catch((error) => next(error))
}

exports.update = (req, res, next) => {
  pageService
    .updateOne(req.params.id, req.body)
    .then((page) => res.status(200).json(page))
    .catch((error) => next(error))
}

exports.delete = (req, res, next) => {
  pageService
    .deleteOne(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
}
