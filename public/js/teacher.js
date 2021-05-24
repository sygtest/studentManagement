const teachers = {
  template: '#teachers',
  data() {
    return {
      teachers: [],
      editTea: {}
    }
  },
  methods: {
    getTeachers() {
      // 通过get请求获取联系信息
      this.$http.get('/getTea').then(res => {
        this.teachers = res.body
      })
    },
    // 这是编辑方法名
    editTeac(id) {
      // 通过get请求'/grades/edit?id=' + id
      this.$http.get('/teachers/edit?id=' + id).then(res => {
        this.editTea = res.body

        this.$router.push({
          // 这个是组件名editgradePage也就是要访问的路由
          name: 'editTeacherPage',
          params: { teacher: this.editTea}
        })
      })
    },
    delTeac(id) {
      this.$http.post('/delTea', { id: id }).then(res => {
        if (res.body.success) {
          alert('删除成功')
          window.location.href = "/teachers"
        }
      })
    }
  },

  mounted() {
    this.getTeachers()
  },

}

// 编辑成绩页面组件
const editTeacherPage = {
  template: '#editTeacherPage',
  data() {
    return {
      teacher: {}
    }
  },
  mounted() {
    this.teacher= this.$route.params.teacher
  },
}

// 添加日志页面组件
const newTeacher = {
  template: '#newTeacher'
}




const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/teachers' },
    { path: '/teachers', component: teachers },
    { path: '/newTeacher', component: newTeacher },
    { path: '/editTeacherPage/', name: 'editTeacherPage', component: editTeacherPage }
  ]
})

const cm = new Vue({
  el: '#cpp',
  data() {
    return {
      searchData: ''
    }
  },
  methods: {
    search() {
      this.$http.post('/searchTeacher', { searchData: this.searchData })
        .then(res => {
          alert('职工号: ' + res.body[0].num + '\n姓名: ' + res.body[0].name + '\n年龄: '
            + res.body[0].age + '\n性别: ' + res.body[0].sex + '\n联系方式: ' + res.body[0].phone
            + '\n住址: ' + res.body[0].address +'\n身份证号: ' + res.body[0].idNumber+ 
            '\n邮箱: ' + res.body[0].email+ '\n专业: ' + res.body[0].major+ '\n学历: ' + res.body[0].education
            + '\n职称: ' + res.body[0].degree + '\n密码：' + res.body[0].password)
        })
    }
  },
  router
})