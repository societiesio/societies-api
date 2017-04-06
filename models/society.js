const mongoose = require('mongoose')

const SocietySchema = mongoose.Schema({
  name: { type: String, required: true, maxLength: 255 },
  summary: { type: String, required: true }
})

const Society = mongoose.model('Society', SocietySchema)

module.exports = Society
