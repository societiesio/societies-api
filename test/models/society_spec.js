const mongoose = require('mongoose')
const Society = require('../../models/society')
const {describe} = require('ava-spec')
const {expect} = require('chai')

describe('Society', it => {
  it('is a Mongoose model', () => {
    expect(new Society()).to.be.instanceof(mongoose.Model)
  })

  it('contains name, summary', () => {
    expect(Society.schema.obj).to.include.keys(['name', 'summary'])
  })
})
