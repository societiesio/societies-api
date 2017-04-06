const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const Koa = require('koa')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const responsetime = require('koa-response-time')

const index = require('./routes/index')
const societies = require('./routes/societies')
const users = require('./routes/users')

const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({ enableTypes: ['json'] }))
app.use(json())
app.use(responsetime())
if (process.env.NODE_ENV !== 'test') {
  app.use(logger())
}

// routes
app.use(index.routes(), index.allowedMethods())
app.use(societies.routes(), societies.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app
