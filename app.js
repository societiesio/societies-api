const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const Koa = require('koa')
const logger = require('koa-logger')
const onerror = require('koa-onerror')

const index = require('./routes/index')
const users = require('./routes/users')

const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({ enableTypes: ['json'] }))
app.use(json())
app.use(logger())
app.use(require('./middlewares/time_logger'))
app.use(require('./middlewares/x_response_time'))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app
