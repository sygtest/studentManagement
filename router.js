const fs = require('fs')
const express = require('express')
const router = express.Router()   
var Student = require('./models/student')
var User = require('./models/user')
var Feedback = require('./models/feedback')
var Grade = require('./models/grade')
var Contact = require('./models/contact')
var Teacher = require('./models/teacher')

// ------------------------------学生用户-----------------------------
// 渲染学生登录后的首页
// 通过get请求 /studentUser
router.get('/studentUser', (req,res) => {
  res.sendFile(__dirname + '/views/student/index.html')
})
// 渲染编辑页
router.get('/studentUser/edit', (req, res) => {
  Student.findById(req.query.id, (err, student) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(student)
  })
})
router.post('/studentUser/edit', (req, res) => {
  Student.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
  })
  Student.findById(req.body.id,(err,user) => {
    if(err) {
      return res.status(500).send('Server error')
    }
    req.session.user = user
    // console.log(req.session.user);
    res.redirect('/studentUser')
  })
},)


// ------------------------------教师用户-----------------------------
router.get('/teacherUser', (req,res) => {
  res.sendFile(__dirname + '/views/teacher/index.html')
})
// 渲染编辑页
router.get('/teacherUser/edit', (req, res) => {
  Teacher.findById(req.query.id, (err, teacher) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(teacher)
  })
})
router.post('/teacherUser/edit', (req, res) => {
  Teacher.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
  })
  Teacher.findById(req.body.id,(err,user) => {
    if(err) {
      return res.status(500).send('Server error')
    }
    req.session.user = user
    res.redirect('/teacherUser')
  })
})





// --------------------------------管理员-----------------------------
// 把路由挂载到router路由容器中
// 当通过get请求/students 获取学生页面
router.get('/students', (req, res) => {   //这个回调函数就是student.js子方法的callback
  res.sendFile(__dirname + '/views/index.html')
})
//当通过get请求/getStu 获取数据库中的学生数据
router.get('/getStu', (req, res) => {
  Student.find((err, students) => {//这里是readFile的两个参数
    if (err) {
      return res.status(500).send('Server error')
    }
    res.send(students)
  })
})

//添加
router.get('/students/create', (req, res) => {
  res.sendFile(__dirname + '/views/create.html')
})
router.post('/students/create', (req, res) => {
  new Student(req.body).save((err) => {
      if (err) {
        return res.status(500).send('添加失败')
      }
      res.redirect('/students')
    })
})

//编辑
router.get('/students/edit', (req, res) => {
  Student.findById(req.query.id, (err, student) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(student)
  })
})
router.get('/edit', (req, res) => {
  res.sendFile(__dirname + '/views/edit.html')
})
router.post('/students/edit', (req, res) => {
  Student.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

//删除
router.post('/del', (req, res) => {
  Student.findByIdAndDelete(req.body.id, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.status(200).json({ success: true })
  })
})

router.get('/getMenNum', (req, res) => {
  Student.find({ "sex": "男" }, (err, men) => {
    if (err) {
      return res.send(false)
    }
    res.json({ menNum: men.length })
  })
})
router.get('/getWomenNum', (req, res) => {
  Student.find({ "sex": "女" }, (err, women) => {
    if (err) {
      return res.send(false)
    }
    res.json({ womenNum: women.length })
  })
})
router.get('/old21', (req, res) => {
  Student.find({ "age": 21 }, (err, data) => {
    if (err) {
      return res.send(false)
    }
    res.json({ num: data.length })
  })
})
router.get('/old22', (req, res) => {
  Student.find({ "age": 22 }, (err, data) => {
    if (err) {
      return res.send(false)
    }
    res.json({ num: data.length })
  })
})
router.get('/old23', (req, res) => {
  Student.find({ "age": 23 }, (err, data) => {
    if (err) {
      return res.send(false)
    }
    res.json({ num: data.length })
  })
})

// ------------------------------渲染登录页面-----------------------
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
})

// ------------------------------判定登录---------------------------
router.post('/login', (req, res) => {
  let body = req.body
  // console.log(body);
// 1.获取表单请求体数据
// 2.判断用户类型，根据用户查找相应的数据表
// 3.判断用户是否存在
// 存在则登录成功并记录用户状态，跳转到相应页面
if(body.kind === 'student'){
  Student.findOne({
    num: body.username,
    password: body.password
  }, (err,user) => {
    if(err) {
      return res.status(500).send(false)
    }

    if (user) {
      req.session.user = user   //登录成功，通过session记录用户登录状态
      return res.status(200).json({
        err_code: 10,
        message: '登录成功'
      })
    } else {
      return res.status(200).json({
        err_code: 1,
        message: '用户名或密码错误'
      })
    }
  })
}
else if (body.kind === 'teacher'){
   Teacher.findOne({
    num: body.username,
    password: body.password
  }, (err,user) => {
    if(err) {
      return res.status(500).send(false)
    }

    if (user) {
      req.session.user = user   //登录成功，通过session记录用户登录状态
      return res.status(200).json({
        err_code: 20,
        message: '登录成功'
      })
    } else {
      return res.status(200).json({
        err_code: 1,
        message: '用户名或密码错误'
      })
    }
  })
}
else{
  User.findOne({              //查询是否有匹配的用户名和密码
    username: body.username,
    password: body.password
  }, (err, user) => {
    if (err) {
      return res.status(500).send(false)
    }

    if (user) {
      req.session.user = user   //登录成功，通过session记录用户登录状态
      return res.status(200).json({
        err_code: 0,
        message: '登录成功'
      })
    } else {
      return res.status(200).json({
        err_code: 1,
        message: '用户名或密码错误'
      })
    }
  })
}

})

router.get('/getUser', (req, res) => {  //给首页vue文件传session数据
  res.send(req.session.user)
})

// 渲染编辑修改密码页面
router.get('/reset', (req,res) => {
  res.sendFile(__dirname + '/views/reset.html')
})

// 修改密码
router.post('/reset', (req, res) => {
  let body = req.body
  User.findOneAndUpdate({              //查询是否有匹配的用户名和密码
    username: body.username,
    password: body.oldpassword
  },{
    password: body.password
  }, (err, user) => {
    if (err) {
      return res.status(500).send(false)
    }
    if (user) {
      req.session.user = user   //登录成功，通过session记录用户登录状态
      return res.status(200).json({
        err_code: 0,
        message: '修改成功'
      })
    } else {
      return res.status(200).json({
        err_code: 1,
        message: '用户名或密码错误'
      })
    }
  })
})

// ----------------------退出----------------------------
router.get('/logout', (req, res) => {
  req.session.user = null
  res.redirect('/')
})

// ---------------------有关管理员中查询的部分--------------------
// 首页查询
router.post('/search', (req, res) => {
  Student.find({ num: +req.body.searchData }, (err, stu) => {
    if (err) {
      return res.status(500).send(false)
    }
    res.send(stu)
  })
})

// 成绩页查询
router.post('/searchGrade', (req, res) => {
  Grade.find({ num: +req.body.searchData }, (err, grade) => {
    if (err) {
      return res.status(500).send(false)
    }
    res.send(grade)
  })
})

// 联系页查询
router.post('/searchContact', (req, res) => {
  Contact.find({ num: +req.body.searchData }, (err, contact) => {
    if (err) {
      return res.status(500).send(false)
    }
    res.send(contact)
  })
})

// 教师页查询
router.post('/searchTeacher', (req, res) => {
  Teacher.find({ num: +req.body.searchData }, (err, teacher) => {
    if (err) {
      return res.status(500).send(false)
    }
    res.send(teacher)
  })
})

// 渲染日志页面
router.get('/feedbacks', (req, res) => {
  res.sendFile(__dirname + '/views/feedback.html')
})

// 获取数据库中日志数据
router.get('/getFed', (req, res) => {
  Feedback.find((err, feedbacks) => {//这里是readFile的两个参数
    if (err) {
      return res.status(500).send('Server error')
    }
    res.send(feedbacks)
  })
})

// 添加日志

router.get('/feedbacks/newFeedback', (req, res) => {
  res.sendFile(__dirname + '/views/newFeedback.html')
})
router.post('/feedbacks/newFeedback', (req, res) => {
  new Feedback(req.body).save((err) => {
      if (err) {
        return res.status(500).send('添加失败')
      }
      res.redirect('/feedbacks')
    })
})

//编辑日志
router.get('/feedbacks/edit', (req, res) => {
  Feedback.findById(req.query.id, (err, feedback) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(feedback)
  })
})
router.get('/edit', (req, res) => {
  res.sendFile(__dirname + '/views/edit.html')
})
router.post('/feedbacks/edit', (req, res) => {
  Feedback.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/feedbacks')
  })
})

//删除日志
router.post('/delFed', (req, res) => {
  Feedback.findByIdAndDelete(req.body.id, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.status(200).json({ success: true })
  })
})

// 渲染成绩页面
router.get('/grades', (req, res) => {
  res.sendFile(__dirname + '/views/grade.html')
})

// 获取数据库中成绩数据
router.get('/getGra', (req, res) => {
  Grade.find((err, grades) => {//这里是readFile的两个参数
    if (err) {
      return res.status(500).send('Server error')
    }
    res.send(grades)
  })
})

// 添加成绩

router.get('/grades/newGrade', (req, res) => {
  res.sendFile(__dirname + '/views/newGrade.html')
})
router.post('/grades/newGrade', (req, res) => {
  new Grade(req.body).save((err) => {
      if (err) {
        return res.status(500).send('添加失败')
      }
      res.redirect('/grades')
    })
})

//编辑成绩
router.get('/grades/edit', (req, res) => {
  Grade.findById(req.query.id, (err, grade) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(grade)
  })
})
router.get('/edit', (req, res) => {
  res.sendFile(__dirname + '/views/edit.html')
})
router.post('/grades/edit', (req, res) => {
  Grade.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/grades')
  })
})

//删除成绩
router.post('/delGra', (req, res) => {
  Grade.findByIdAndDelete(req.body.id, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.status(200).json({ success: true })
  })
})


// 渲染信息页面
router.get('/contacts', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html')
})

// 获取数据库中联系数据
router.get('/getCon', (req, res) => {
  Contact.find((err, contacts) => {//这里是readFile的两个参数
    if (err) {
      return res.status(500).send('Server error')
    }
    res.send(contacts)
  })
})

// 添加联系

router.get('/contacts/newContact', (req, res) => {
  res.sendFile(__dirname + '/views/newContact.html')
})
router.post('/contacts/newContact', (req, res) => {
  new Contact(req.body).save((err) => {
      if (err) {
        return res.status(500).send('添加失败')
      }
      res.redirect('/contacts')
    })
})

//编辑联系信息
router.get('/contacts/edit', (req, res) => {
  Contact.findById(req.query.id, (err, contact) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(contact)
  })
})
router.post('/contacts/edit', (req, res) => {
  Contact.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/contacts')
  })
})

//删除联系信息
router.post('/delCon', (req, res) => {
  Contact.findByIdAndDelete(req.body.id, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.status(200).json({ success: true })
  })
})


// 渲染教师页面
router.get('/teachers', (req, res) => {
  res.sendFile(__dirname + '/views/teacher.html')
})

// 获取数据库中成绩数据
router.get('/getTea', (req, res) => {
  Teacher.find((err, teachers) => {//这里是readFile的两个参数
    if (err) {
      return res.status(500).send('Server error')
    }
    res.send(teachers)
  })
})

// 添加教师信息

router.get('/teachers/newTeacher', (req, res) => {
  res.sendFile(__dirname + '/views/newTeacher.html')
})
router.post('/teachers/newTeacher', (req, res) => {
  new Teacher(req.body).save((err) => {
      if (err) {
        return res.status(500).send('添加失败')
      }
      res.redirect('/teachers')
    })
})

//编辑教师信息
router.get('/teachers/edit', (req, res) => {
  Teacher.findById(req.query.id, (err, teacher) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.send(teacher)
  })
})
router.post('/teachers/edit', (req, res) => {
  Teacher.findByIdAndUpdate(req.body.id, req.body, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/teachers')
  })
})

//删除教师信息
router.post('/delTea', (req, res) => {
  Teacher.findByIdAndDelete(req.body.id, (err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.status(200).json({ success: true })
  })
})

module.exports = router