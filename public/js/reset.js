const reset = {
  template: '#reset',
  data() {
    return {
      username: '',
      oldpassword:'',
      password: ''
    }
  },
  methods: {
    reset() {
      if (this.username == '') {
        return alert('请输入用户名')
      }
      if (this.oldpassword == '') {
        return alert('请输入密码')
      }
      // console.log(this.username+this.password+this.oldpassword);
      // console.log(this._data);
      // console.log(this._data.username);
      this.$http.post('/reset', this._data).then((res) => {
        if (res.body == false) {
          alert('服务器忙，请稍后重试')
        } else if (res.body.err_code == 1) {
          alert('用户名或密码错误')
        } else if (res.body.err_code == 0) {
          alert('修改成功！')
          window.location.href = '/students'
        }

      })
    }
  },
}


const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/reset' },
    { path: '/reset', component: reset}
  ],
  linkActiveClass: 'active'
})

new Vue({
  el: '#app',
  methods: {
  },
  router,
  mounted() {
  },
})