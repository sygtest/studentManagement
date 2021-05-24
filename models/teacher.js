// 1 引包
const mongoose = require('mongoose')
// 2 导出mongoose中的用于建立数据模型的schema数据
const Schema = mongoose.Schema;
// 3 连接数据库
mongoose.connect('mongodb://localhost:27017/student')

// 4创建数据模型

var teacherSchema = new Schema({
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
  phone:{
    type: Number,
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
  major:{
    type: String,
    default:''
  },
  education:{
    type: String,
    default:''
  },
  degree:{
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
    default: 2
  }
})

module.exports = mongoose.model('Teacher', teacherSchema)