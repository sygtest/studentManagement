// 编辑学生页面组件
const editMessagePage = {
  template: '#editMessagePage',
  data() {
    return {
      student: {}
    }
  },
  methods: {
  
  },
  mounted() {
    this.student = this.$route.params.student
  },
}


const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/studentUser' }, //这里的/ 是基于父组件路由之下 即就是/students/
    { path: '/studentUser' },
    { path: '/editMessagePage/', name: 'editMessagePage', component: editMessagePage },

  ]
})

const vm = new Vue({
  el: '#app',
  data() {
    return {
      user: {},
      editStu:{}
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
    editStudentMessage(id) {
      // 通过get请求'/students/edit?id=' + id
      this.$http.get('/studentUser/edit?id=' + id).then(res => {
        this.editStu = res.body
        this.$router.push({
          // 这个是组件名editPage页就是要访问的路由
          name: 'editMessagePage',
          params: { student: this.editStu }
        })
        
      })
      
    },

  },
  mounted() {
    this.getUser()
  },
  router
})