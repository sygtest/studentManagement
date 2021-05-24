const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var fbSchema = new Schema({
  tt: { type: String, required: true },
  text: { type: String, required: true },
  createdTime: {type: Date, default: Date.now},
  lastModified: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Feedback', fbSchema)