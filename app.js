require('dotenv').config({ silent: true })
const error = require('debug')(`${process.env.npm_package_name}:web:error`)

const Koa = require('koa')
const app = new Koa()

app.use(require('./middlewares/logger'))
app.use(require('./middlewares/response_time'))

app.use(require('./routes/index'))

app.on('error', (err) => error('server error', err))

module.exports = app
