var mongoose = require('mongoose')

// 连接数据库

mongoose.connect('mongodb://localhost/student')

var User = require ('./models/user')

new User({
  username:'admin',
  password:123456
}).save(function(err,ret){
  if(err){
    console.log('保存失败');
  } else{
    console.log('保存成功');
  }
})