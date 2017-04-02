const mongoose = require('mongoose')

const SocietySchema = mongoose.Schema({
  name: String,
  summary: String
})

const Society = mongoose.model('Society', SocietySchema)

module.exports = Society
