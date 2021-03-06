const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var studentSchema = new Schema({
  num: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    default: 123456
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default:''
  },
  sex: {
    type: String,
    default:''
  },
  hobbies: {
    type: String,
    default:''
  },
  qq:{
    type: String,
   default:''
  },
  address:{
    type: String,
   default:''
  },
  idNumber:{
    type: String,
   default:''
  },
  email:{
    type: String,
  },
  dorm:{
    type: String,
   default:''
  },
  major:{
    type: String,
   default:''
  },
  education:{
    type: String,
   default:''
  },
  originAdd:{
    type: String,
   default:''
  },
  createdTime:{
    type: Date,
    default: Date.now
  },
  lastModified:{
    type: Date,
    default: Date.now()
  },
  power: {
    type: Number,
    default: 1
  }

  
})

module.exports = mongoose.model('Student', studentSchema)

