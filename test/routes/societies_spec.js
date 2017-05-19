const Society = require('../../models/society')
const {get, post, patch, del} = require('../support/helpers/request')
const {dbHooks} = require('../support/helpers/database')
const {describe, beforeEach} = require('ava-spec')
const {expect} = require('chai')

describe('Societies API', () => {
  let society

  dbHooks()

  beforeEach(async () => {
    society = await new Society({
      name: 'Dead Poets Society',
      summary: 'foo-bar'
    }).save()
  })

  describe('GET /societies', it => {
    it.serial('returns all societies', async () => {
      const response = await get('/societies')

      expect(response.body).to.have
        .deep.property('[0].name', 'Dead Poets Society')
    })
  })

  describe('POST /societies', it => {
    it.serial('creates a new society', async () => {
      await post('/societies', {
        name: 'Foo bar',
        summary: 'a new society'
      })

      const count = await Society.count()
      expect(count).to.equal(2)
    })

    it.serial('responds with society data', async () => {
      const response = await post('/societies', {
        name: 'Foo bar',
        summary: 'a new society'
      })

      expect(response.body).to.include({
        name: 'Foo bar',
        summary: 'a new society'
      })
    })

    it.serial('returns 422 when validation fails', async () => {
      await post('/societies', {
        summary: 'a new society'
      }, 422)
    })
  })

  describe('GET /societies/:id', it => {
    it.serial('returns a single society', async () => {
      const response = await get(`/societies/${society._id}`)

      expect(response.body).to.have.property('name', 'Dead Poets Society')
    })
  })

  describe('PATCH /societies/:id', it => {
    it.serial('updates society values', async () => {
      await patch(`/societies/${society._id}`, {
        summary: 'Some group of poets'
      })

      const model = await Society.findOne({ _id: society._id })
      expect(model).to.have.property('summary', 'Some group of poets')
    })

    it.serial('responds with updated society data', async () => {
      const response = await patch(`/societies/${society._id}`, {
        summary: 'Some group of poets'
      })

      expect(response.body).to.include({
        name: 'Dead Poets Society',
        summary: 'Some group of poets'
      })
    })
  })

  describe('DELETE /societies/:id', it => {
    it.serial('destroy a society', async () => {
      await del(`/societies/${society._id}`)

      const count = await Society.count()
      expect(count).to.equal(0)
    })

    it.serial('responds with deleted society data', async () => {
      const response = await del(`/societies/${society._id}`)

      expect(response.body).to.include({
        name: 'Dead Poets Society',
        summary: 'foo-bar'
      })
    })
  })
})
