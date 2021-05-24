const feedbacks = {
  template: '#feedbacks',
  data() {
    return {
      feedbacks: [],
      editFed: {}
    }
  },
  methods: {
    getFeedbacks() {
      // 通过get请求获取日志信息
      this.$http.get('/getFed').then(res => {
        this.feedbacks = res.body
      })
    },
    // 这是编辑方法名
    editFeed(id) {
      // 通过get请求'/feedbacks/edit?id=' + id
      this.$http.get('/feedbacks/edit?id=' + id).then(res => {
        this.editFed = res.body

        this.$router.push({
          // 这个是组件名editFeedbackPage也就是要访问的路由
          name: 'editFeedbackPage',
          params: { feedback: this.editFed }
        })
      })
    },
    delFeed(id) {
      this.$http.post('/delFed', { id: id }).then(res => {
        if (res.body.success) {
          alert('删除成功')
          window.location.href = "/feedbacks"
        }
      })
    }
  },

  mounted() {
    this.getFeedbacks()
  },

}

// 编辑日志页面组件
const editFeedbackPage = {
  template: '#editFeedbackPage',
  data() {
    return {
      feedback: {}
    }
  },
  mounted() {
    this.feedback= this.$route.params.feedback
  },
}

// 添加日志页面组件
const newFeedback = {
  template: '#newFeedback'
}




const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/feedbacks' },
    { path: '/feedbacks', component: feedbacks },
    { path: '/newFeedback', component: newFeedback },
    { path: '/editFeedbackPage/', name: 'editFeedbackPage', component: editFeedbackPage }
  ]
})

const cm = new Vue({
  el: '#bpp',
  router
})