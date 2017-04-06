const app = require('../../../app')
const request = require('supertest')

const get = (url, statusCode = 200) => {
  return request(app.listen())
    .get(url)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(statusCode)
}

const post = (url, data, statusCode = 200) => {
  return request(app.listen())
    .post(url)
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(statusCode)
}

const patch = (url, data, statusCode = 200) => {
  return request(app.listen())
    .patch(url)
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(statusCode)
}

const del = (url, statusCode = 200) => {
  return request(app.listen())
    .delete(url)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(statusCode)
}

module.exports = { get, post, patch, del }
