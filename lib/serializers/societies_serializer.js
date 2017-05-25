const { Serializer, Deserializer } = require('jsonapi-serializer')

const attributes = ['id', 'name', 'summary']

module.exports = {
  Serializer: new Serializer('societies', { attributes }),
  Deserializer: new Deserializer()
}
