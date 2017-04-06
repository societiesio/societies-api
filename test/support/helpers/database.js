// use a different database for each test
process.env.DATABASE_URL += `-test-${process.pid}`

const connection = require('../../../models/_connection')
const {after, afterEach} = require('ava-spec')
const Society = require('../../../models/society')

const cleanDb = async () => {
  await Society.remove()
}

const dropDb = () => connection.db.dropDatabase()

const dbHooks = () => {
  afterEach(() => cleanDb())
  after.always(() => dropDb())
}

module.exports = { cleanDb, dropDb, dbHooks }
