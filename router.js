//后端路由模块
const fs = require('fs')
const express = require('express')
const router = express.Router()   //express包装路由的容器
var Student = require('./models/student')
var User = require('./models/user')
var Feedback = require('./models/feedback')

// 把路由挂载到router路由容器中
router.get('/students', (req, res) => {   //这个回调函数就是student.js子方法的callback
  res.sendFile(__dirname + '/views/index.html')
})
// 获取数据库中的学生信息
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

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
})

router.post('/login', (req, res) => {
  let body = req.body
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
})

router.get('/getUser', (req, res) => {  //给首页vue文件传session数据
  res.send(req.session.user)
})

router.get('/logout', (req, res) => {
  req.session.user = null
  res.redirect('/')
})

router.post('/search', (req, res) => {
  Student.find({ num: +req.body.searchData }, (err, stu) => {
    if (err) {
      return res.status(500).send(false)
    }
    res.send(stu)
  })
})

router.get('/feedback', (req, res) => {
  res.sendFile(__dirname + '/views/feedback.html')
})
router.post('/feedback', (req, res) => {
  new Feedback(req.body).save(err => {
    if (err) {
      return console.log('error');
    }
    res.redirect('/students')
  })
})

module.exports = router