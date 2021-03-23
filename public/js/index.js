const students = {
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
      this.$http.get('/getStu').then(res => {
        this.students = res.body
      })
    },
    edit(id) {
      this.$http.get('/students/edit?id=' + id).then(res => {
        this.editStu = res.body

        this.$router.push({
          name: 'editPage',
          params: { student: this.editStu }
        })
      })
    },
    del(id) {
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
    this.getStudents()
    this.sexVD()
    this.oldVD()
  },

}

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
    { path: '/', redirect: '/students' },
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
          window.location.href = "/"
        }
      })
    },
    search() {
      this.$http.post('/search', { searchData: this.searchData })
        .then(res => {
          alert('学号: ' + res.body[0].num + '\n姓名: ' + res.body[0].name + '\n年龄: '
            + res.body[0].age + '\n性别: ' + res.body[0].sex + '\n爱好: ' + res.body[0].hobbies)
        })
    },

  },
  mounted() {
    this.getUser()
  },
  router
})