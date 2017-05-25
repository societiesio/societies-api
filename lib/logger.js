const debug = require('debug')

module.exports = (namespace) => ({
  logInfo: debug(`${process.env.npm_package_name}:${namespace}`),
  logWarn: debug(`${process.env.npm_package_name}:${namespace}:warning`),
  logError: debug(`${process.env.npm_package_name}:${namespace}:error`)
})
