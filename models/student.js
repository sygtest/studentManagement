const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var studentSchema = new Schema({
  num: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  hobbies: {
    type: String
  }
})

module.exports = mongoose.model('Student', studentSchema)

