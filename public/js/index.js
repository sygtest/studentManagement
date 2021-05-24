// 这是针对渲染学生页面的对象
const students = { //渲染学生页面的组件
  template: '#students',
  data() {
    return {
      menNum: 0,
      womenNum: 0,
      olds: [],
      students: [],
      editStu: {}
    }
  },
  methods: {
    getStudents() {
      // 通过get请求/getStu获取学生信息
      this.$http.get('/getStu').then(res => {
        this.students = res.body
      })
    },
    edit(id) {
      // 通过get请求'/students/edit?id=' + id
      this.$http.get('/students/edit?id=' + id).then(res => {
        this.editStu = res.body

        this.$router.push({
          // 这个是组件名editPage页就是要访问的路由
          name: 'editPage',
          params: { student: this.editStu }
        })
      })
    },
    del(id) {
      // 通过发送post请求/del来删除学生信息
      this.$http.post('/del', { id: id }).then(res => {
        if (res.body.success) {
          alert('删除成功')
          window.location.href = "/students"
        }
      })
    },
    sexVD() {
      this.$http.get("/getMenNum").then(res => {
        this.menNum = res.body.menNum

        this.$http.get("/getWomenNum").then(res => {
          this.womenNum = res.body.womenNum
          var sexChart = echarts.init(document.getElementById('pie1'), 'light'); // dark 可尝试修改为 light
          sexChart.setOption({
            title: {
              text: '性别比例',
              left: 'center'
            },
            tooltip: {
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              bottom: 0,
              left: 'center',
              data: ['男', '女']
            },
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                  { value: this.menNum, name: '男' },
                  { value: this.womenNum, name: '女' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        })

      })
    },
    oldVD() {
      const that = this
      this.$http.get('/old21').then(res => {
      })
      function showOlds() {
        var oldChart = echarts.init(document.getElementById('pie2'), 'light'); // dark 可尝试修改为 light
        oldChart.setOption({
          title: {
            text: '年龄组成',
            left: 'center'
          },
          tooltip: { formatter: '{a} <br/>{b} : {c} ({d}%)' },

          legend: {
            bottom: 0,
            left: 'center',
            data: ['18岁', '19岁', '20岁', '21岁', '22岁', '23岁']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                { value: that.olds[0], name: '21岁' },
                { value: that.olds[1], name: '22岁' },
                { value: that.olds[2], name: '23岁' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
      function getOlds(path) {
        return new Promise((resolve, reject) => {
          that.$http.get(path).then(res => {
            resolve(res.body.num)
          })
        })
      }
      getOlds('/old21')
        .then(data => {
          this.olds.push(data)
          return getOlds('/old22')
        })
        .then(data => {
          this.olds.push(data)
          return getOlds('/old23')
        })
        .then(data => {
          this.olds.push(data)
          showOlds()
        })
    },

  },

  mounted() {
    // 在挂载时调用以下方法获取数据库中的数据
    this.getStudents()
    this.sexVD()
    this.oldVD()
  },

}

// 编辑学生页面组件
const editPage = {
  template: '#editPage',
  data() {
    return {
      student: {}
    }
  },
  mounted() {
    this.student = this.$route.params.student
  },
}

// 添加学生页面组件
const create = {
  template: '#create'
}

const profile = {
  template: "#profile"
}
const help = {
  template: "#help"
}


const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/students' }, //这里的/ 是基于父组件路由之下 即就是/students/
    { path: '/students', component: students },
    { path: '/create', component: create },
    { path: '/editPage/', name: 'editPage', component: editPage },
    { path: '/profile', component: profile },
    { path: '/help', component: help }
  ]
})

const vm = new Vue({
  el: '#app',
  data() {
    return {
      user: {},
      searchData: ''
    }
  },
  methods: {
    getUser() {
      this.$http.get("/getUser").then(res => {
        this.user = res.body
        if (!this.user) {
          window.location.href = "/" //这里的/ 指向登录页面
        }
      })
    },
    search() {
      this.$http.post('/search', { searchData: this.searchData })
        .then(res => {
          alert('学号: ' + res.body[0].num + '\n姓名: ' + res.body[0].name + '\n年龄: '
            + res.body[0].age + '\n性别: ' + res.body[0].sex + '\n爱好: ' + res.body[0].hobbies+ '\nqq号: ' + res.body[0].qq
            + '\n住址: ' + res.body[0].address+ '\n身份证号: ' + res.body[0].idNumber+ '\n邮箱: ' + res.body[0].email
            + '\n宿舍: ' + res.body[0].dorm+ '\n专业: ' + res.body[0].major+ '\n学历: ' + res.body[0].education
            + '\n生源地: ' + res.body[0].originAdd + '\n密码：' + res.body[0].password)
        })
    },

  },
  mounted() {
    this.getUser()
  },
  router
})