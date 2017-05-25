// use a different database for test
process.env.DATABASE_URL += `-test`

const connection = require('../../../models/_connection')
const Society = require('../../../models/society')

const cleanDb = async () => {
  await Society.remove()
}

const dropDb = () => connection.db.dropDatabase()

const dbHooks = () => {
  afterEach(() => cleanDb())
  after(() => dropDb())
}

module.exports = { cleanDb, dropDb, dbHooks }
