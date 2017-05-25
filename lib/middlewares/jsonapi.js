const { Error: JsonApiError } = require('jsonapi-serializer')
const Promise = require('bluebird')
const R = require('ramda')

module.exports = ({ Serializer, Deserializer }) => {
  const deserialize = Promise.promisify(Deserializer.deserialize)

  return async (ctx, next) => {
    try {
      if (!R.isEmpty(ctx.request.body)) {
        ctx.request.body = await deserialize(ctx.request.body)
      }
      await next()
      ctx.body = Serializer.serialize(ctx.body)
    } catch (err) {
      ctx.status = err.statusCode || 422
      ctx.body = new JsonApiError({
        status: ctx.status,
        title: err.error || 'Unprocessable Entity',
        detail: err.message
      })
    }
  }
}
