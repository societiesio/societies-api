const Society = require('../../models/society')
const {get, post, patch, del} = require('../support/helpers/request')
const {dbHooks} = require('../support/helpers/database')

describe('Societies API', () => {
  let society

  dbHooks()

  beforeEach(async () => {
    society = await new Society({
      name: 'Dead Poets Society',
      summary: 'just a good movie'
    }).save()
  })

  describe('GET /societies', () => {
    let response
    beforeEach(async () => {
      response = await get('/societies')
    })

    it('reponds all societies', () => {
      expect(response.body).to.have.deep.property('data')
        .that.is.an('array')
        .that.has.deep.property('[0].attributes.name', 'Dead Poets Society')
    })

    it('reponds only id, name and summary fields', () => {
      expect(response.body).to.have.deep.property('data.[0].attributes')
        .that.have.all.keys('id', 'name', 'summary')
    })
  })

  describe('POST /societies', () => {
    let response
    beforeEach(async() => {
      response = await post('/societies', {
        data: {
          type: 'societies',
          attributes: {
            name: 'Foo bar',
            summary: 'a new society'
          }
        }
      })
    })

    it('creates a new society', async () => {
      const count = await Society.count()
      expect(count).to.equal(2)
    })

    it('responds with a society entity', () => {
      expect(response.body).to.have.deep.property('data.type', 'societies')
    })

    it('responds with society data', () => {
      expect(response.body).to.have.deep.property('data.attributes')
        .that.include({ name: 'Foo bar', summary: 'a new society' })
    })

    it('reponds 422 when validation fails', async () => {
      await post('/societies', {
        data: {
          type: 'societies',
          attributes: {
            summary: 'a new society'
          }
        }
      }, 422)
    })
  })

  describe('GET /societies/:id', () => {
    let response
    beforeEach(async () => {
      response = await get(`/societies/${society._id}`)
    })

    it('reponds a society entity', () => {
      expect(response.body).to.have.deep.property('data.type', 'societies')
    })

    it('reponds society data', () => {
      expect(response.body).to.have.deep.property('data.attributes')
        .that.contain({
          name: 'Dead Poets Society',
          summary: 'just a good movie'
        })
    })
  })

  describe('PATCH /societies/:id', () => {
    let response
    beforeEach(async () => {
      response = await patch(`/societies/${society._id}`, {
        data: {
          type: 'societies',
          id: society._id,
          attributes: {
            summary: 'Some group of poets'
          }
        }
      })
    })

    it('updates society values', async () => {
      const model = await Society.findOne({ _id: society._id })
      expect(model).to.have.property('summary', 'Some group of poets')
    })

    it('reponds a society entity', () => {
      expect(response.body).to.have.deep.property('data.type', 'societies')
    })

    it('responds with updated society data', () => {
      expect(response.body).to.have
        .deep.property('data.attributes.summary', 'Some group of poets')
    })
  })

  describe('DELETE /societies/:id', () => {
    let response
    beforeEach(async () => {
      response = await del(`/societies/${society._id}`)
    })

    it('destroy a society', async () => {
      const count = await Society.count()
      expect(count).to.equal(0)
    })

    it('reponds a society entity', () => {
      expect(response.body).to.have.deep.property('data.type', 'societies')
    })

    it('responds with deleted society data', () => {
      expect(response.body).to.have.deep.property('data.attributes')
        .that.contain({
          name: 'Dead Poets Society',
          summary: 'just a good movie'
        })
    })
  })
})
