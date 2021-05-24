const grades = {
  template: '#grades',
  data() {
    return {
      grades: [],
      editGra: {}
    }
  },
  methods: {
    getGrades() {
      // 通过get请求获取成绩信息
      this.$http.get('/getGra').then(res => {
        this.grades = res.body
      })
    },
    // 这是编辑方法名
    editGrad(id) {
      // 通过get请求'/grades/edit?id=' + id
      this.$http.get('/grades/edit?id=' + id).then(res => {
        this.editGra = res.body

        this.$router.push({
          // 这个是组件名editgradePage也就是要访问的路由
          name: 'editGradePage',
          params: { grade: this.editGra}
        })
      })
    },
    delGrad(id) {
      this.$http.post('/delGra', { id: id }).then(res => {
        if (res.body.success) {
          alert('删除成功')
          window.location.href = "/grades"
        }
      })
    }
  },

  mounted() {
    this.getGrades()
  },

}

// 编辑成绩页面组件
const editGradePage = {
  template: '#editGradePage',
  data() {
    return {
      grade: {}
    }
  },
  mounted() {
    this.grade= this.$route.params.grade
  },
}

// 添加日志页面组件
const newGrade = {
  template: '#newGrade'
}




const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/grades' },
    { path: '/grades', component: grades },
    { path: '/newGrade', component: newGrade },
    { path: '/editGradePage/', name: 'editGradePage', component: editGradePage }
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
      this.$http.post('/searchGrade', { searchData: this.searchData })
        .then(res => {
          alert('学号: ' + res.body[0].num + '\n姓名: ' + res.body[0].name + '\n大学生职业发展与规划: '
            + res.body[0].profession + '\n大学英语: ' + res.body[0].english + '\n高等数学: ' + res.body[0].math+ '\n心理健康教育: ' + res.body[0].psychology
            + '\n体育: ' + res.body[0].sports+ '\n学习方法: ' + res.body[0].study+ '\n创新素质培育: ' + res.body[0].innovate
            + '\n科研方法: ' + res.body[0].science )
        })
    }
  },
  router
})