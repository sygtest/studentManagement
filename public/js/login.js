const home = {
  template: '#home'
}

const login = {
  template: '#login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.username == '') {
        return alert('请输入用户名')
      }
      if (this.password == '') {
        return alert('请输入密码')
      }
      this.$http.post('/login', this._data).then((res) => {
        if (res.body == false) {
          alert('服务器忙，请稍后重试')
        } else if (res.body.err_code == 1) {
          alert('用户名或密码错误')
        } else if (res.body.err_code == 0) {
          alert('登录成功！')
          window.location.href = '/students'
        }
      })
    }
  },
}

const contact = {
  template: '#contact'
}

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/login', component: login },
    { path: '/contact', component: contact }
  ],
  linkActiveClass: 'active'
})

new Vue({
  el: '#app',
  methods: {
    getUser(){
      this.$http.get("/getUser").then( res => {
        this.user = res.body
        if (this.user) {
          window.location.href="/students"
        }
      })
    }
  },
  router,
  mounted() {
    this.getUser()
  },
})