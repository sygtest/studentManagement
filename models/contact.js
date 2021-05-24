const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var contactSchema = new Schema({
  num: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    default: ''
  },
  father: {
    type: String,
    default:''
  },
  fatherPhone: {
    type: Number,
    default: ''
  },
  mother: {
    type: String,
    default:''
  },
  motherPhone: {
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

module.exports = mongoose.model('Contact', contactSchema)