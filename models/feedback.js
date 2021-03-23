const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var fbSchema = new Schema({
  tt: { type: String, required: true },
  text: { type: String, required: true }
})

module.exports = mongoose.model('Feedback', fbSchema)