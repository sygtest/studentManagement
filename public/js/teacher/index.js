// 编辑学生页面组件
const editMessagePage = {
  template: '#editMessagePage',
  data() {
    return {
      teacher: {}
    }
  },
  methods: {
  
  },
  mounted() {
    this.teacher = this.$route.params.teacher
  },
}


const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/teacherUser' }, //这里的/ 是基于父组件路由之下 即就是/teachers/
    { path: '/teacherUser' },
    { path: '/editMessagePage/', name: 'editMessagePage', component: editMessagePage },

  ]
})

const vm = new Vue({
  el: '#app',
  data() {
    return {
      user: {},
      teachers: [],
      editTea:{}
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
    editTeacherMessage(id) {
      // 通过get请求'/students/edit?id=' + id
      this.$http.get('/teacherUser/edit?id=' + id).then(res => {
        this.editTea = res.body
        this.$router.push({
          // 这个是组件名editPage页就是要访问的路由
          name: 'editMessagePage',
          params: { teacher: this.editTea }
        })
      })
    },

  },
  mounted() {
    this.getUser()
  },
  router
})