const mongoose = require('mongoose')
const Society = require('../../models/society')

describe('Society', () => {
  it('is a Mongoose model', () => {
    expect(new Society()).to.be.instanceof(mongoose.Model)
  })

  it('contains name, summary', () => {
    expect(Society.schema.obj).to.include.keys(['name', 'summary'])
  })
})
