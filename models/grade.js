const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var gradeSchema = new Schema({
  num: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  profession: {
    type: Number,
    default: ''
  },
  english: {
    type: Number,
    default: ''
  },
  math: {
    type: Number,
    default: ''
  },
  psychology: {
    type: Number,
    default: ''
  },
  sports: {
    type: Number,
    default: ''
  },
  study: {
    type: Number,
    default: ''
  },
  innovate: {
    type: Number,
    default: ''
  },
  science: {
    type: Number,
    default: ''
  },
  createdTime: {
    type: Date,
     default: Date.now
    },
  lastModified: {
    type: Date,
     default: Date.now
    }
})

module.exports = mongoose.model('Grade', gradeSchema)