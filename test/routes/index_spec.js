const app = require('../../app')
const request = require('supertest')

describe('Index API', () => {
  describe('GET /', () => {
    it('returns a Hello World', async () => {
      await request(app.listen())
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { text: 'Hello world' })
    })
  })
})
