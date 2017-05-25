const { logError, logInfo } = require('../lib/logger')('database')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(process.env.DATABASE_URL)
const connection = mongoose.connection

connection.on('error', logError)
connection.once('open', () => logInfo('Database connection established'))

module.exports = connection
