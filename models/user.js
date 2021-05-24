const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  adminname:{type: String, default: 'admin'},
  createdTime:{type: Date, default: Date.now},
  lastModified:{type: Date, default: Date.now},
  power: {
    type: Number,
    default: 3
  }
})

module.exports = mongoose.model('User', userSchema)