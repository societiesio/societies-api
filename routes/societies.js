const router = require('koa-router')()
const Society = require('../models/society')
const SocietiesSerializer = require('../lib/serializers/societies_serializer')
const jsonapi = require('../lib/middlewares/jsonapi')

router
  .prefix('/societies')
  .use(jsonapi(SocietiesSerializer))
  .get('/', index)
  .post('/', create)
  .get('/:id', show)
  .patch('/:id', update)
  .delete('/:id', destroy)

async function index (ctx, next) {
  ctx.body = await Society.find()
}

async function create (ctx, next) {
  try {
    ctx.body = await new Society(ctx.request.body).save()
  } catch (err) {
    ctx.status = 422
    ctx.body = err
  }
}

async function show (ctx, next) {
  const model = await Society.findOne({ _id: ctx.params.id })

  if (!model) {
    throw new Error('Not found', 404)
  }

  ctx.body = model
}

async function update (ctx, next) {
  const model = await Society.findOne({ _id: ctx.params.id })

  if (!model) {
    throw new Error('Not found', 404)
  }

  Object.assign(model, ctx.request.body)
  await model.save()
  ctx.body = model
}

async function destroy (ctx, next) {
  const model = await Society.findOne({ _id: ctx.params.id })

  if (!model) {
    throw new Error('Not found', 404)
  }

  await model.remove()
  ctx.body = model
}

module.exports = router
