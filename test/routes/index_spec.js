const app = require('../../app')
const {describe} = require('ava-spec')
const request = require('supertest')

describe('Index', () => {
  describe('GET /', it => {
    it('returns a Hello World', async () => {
      await request(app.listen())
        .get('/')
        .set('Accept', 'test/html')
        .expect(200, 'Hello world')
    })
  })
})
