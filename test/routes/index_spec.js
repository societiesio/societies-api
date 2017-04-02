const app = require('../../app')
const request = require('supertest')
const {describe} = require('ava-spec')

describe('Index API', () => {
  describe('GET /', it => {
    it('returns a Hello World', async () => {
      await request(app.listen())
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { text: 'Hello world' })
    })
  })
})
