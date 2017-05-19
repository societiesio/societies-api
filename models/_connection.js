const debug = require('debug')(`${process.env.npm_package_name}:database`)
const error = require('debug')(`${process.env.npm_package_name}:database:error`)
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(process.env.DATABASE_URL)
const connection = mongoose.connection

connection.on('error', error)
connection.once('open', () => debug('Database connection established'))

module.exports = connection
