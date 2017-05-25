module.exports = ({ Serializer, Deserializer }) => {
  return async (ctx, next) => {
    await next()
    ctx.body = Serializer.serialize(ctx.body)
  }
}
