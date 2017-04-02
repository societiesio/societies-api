// use a different database for each test
process.env.DATABASE_URL += `-test-${process.pid}`

const connection = require('../../../models/_connection')
const Society = require('../../../models/society')

const cleanDb = async () => {
  await Society.remove()
}

const dropDb = async () => await connection.db.dropDatabase()

module.exports = { cleanDb, dropDb }
