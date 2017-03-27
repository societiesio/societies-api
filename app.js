require('dotenv').config({ silent: true })

const Koa = require('koa')
const app = new Koa()

app.use(require('./middlewares/logger'))
app.use(require('./middlewares/response_time'))

app.use(require('./routes/index'))

module.exports = app
