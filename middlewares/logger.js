const debug = require('debug')(`${process.env.npm_package_name}:web`)

module.exports = async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  debug(`${ctx.method} ${ctx.url} - ${ms}ms`)
}
