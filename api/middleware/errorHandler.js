module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError')
    return res.status(400).send({ error: err.message })
  
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')
    return res.status(401).send({ error: err.message })

  if (err.name === 'NotFoundError')
    return res.status(404).send({ error: err.message })

  return res.status(500).send({ error: err.message })
}
