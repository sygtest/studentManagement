const contacts = {
  template: '#contacts',
  data() {
    return {
      contacts: [],
      editCon: {}
    }
  },
  methods: {
    getContacts() {
      // 通过get请求获取联系信息
      this.$http.get('/getCon').then(res => {
        this.contacts = res.body
      })
    },
    // 这是编辑方法名
    editCont(id) {
      // 通过get请求'/grades/edit?id=' + id
      this.$http.get('/contacts/edit?id=' + id).then(res => {
        this.editCon = res.body

        this.$router.push({
          // 这个是组件名editgradePage也就是要访问的路由
          name: 'editContactPage',
          params: { contact: this.editCon}
        })
      })
    },
    delCont(id) {
      this.$http.post('/delCon', { id: id }).then(res => {
        if (res.body.success) {
          alert('删除成功')
          window.location.href = "/contacts"
        }
      })
    }
  },

  mounted() {
    this.getContacts()
  },

}

// 编辑成绩页面组件
const editContactPage = {
  template: '#editContactPage',
  data() {
    return {
      contact: {}
    }
  },
  mounted() {
    this.contact= this.$route.params.contact
  },
}

// 添加日志页面组件
const newContact = {
  template: '#newContact'
}




const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/contacts' },
    { path: '/contacts', component: contacts },
    { path: '/newContact', component: newContact },
    { path: '/editContactPage/', name: 'editContactPage', component: editContactPage }
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
      this.$http.post('/searchContact', { searchData: this.searchData })
        .then(res => {
          alert('学号: ' + res.body[0].num + '\n姓名: ' + res.body[0].name + '\n联系方式: '
            + res.body[0].phone + '\n父亲: ' + res.body[0].father + '\n父亲联系方式: ' + res.body[0].fatherPhone+ '\n母亲: ' + res.body[0].mother
            + '\n母亲联系方式: ' + res.body[0].motherPhone)
        })
    }
  },
  router
})