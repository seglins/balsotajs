const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const config = require('./config')
const db = require('./db')
const routes = require('./routes')
const { errorHandler, errorLogger, tokenExtractor } = require('./middleware')

const app = express()

db.connect()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(tokenExtractor)

// app.use('/users', routes.user)
app.use('/parties', routes.party)
app.use('/regions', routes.region)
app.use('/pages', routes.page)
app.use('/votes', routes.vote)
app.use('/auth', routes.auth)

app.use(errorLogger)
app.use(errorHandler)
app.use('*', (req, res) => res.status(404).end())
app.listen(config.PORT, () => console.log(`App running on ${config.PORT}`))
