<style lang='stylus' scoped>
.login__container
  height 700px
  background url('http://157.122.54.189:9093/images/bar1.jpg') center center no-repeat
.login__main
  width 400px
.login__btn
  width 100%
</style>
<template lang='pug'>
.login
  el-row(class="login__container" type="flex" justify="center" align="middle")
    .login__main
      el-tabs(type='border-card' class="login__tabs")
        el-tab-pane(label='登陆')
          el-form(ref='loginForm' :model='loginForm' :rules='loginRules')
            el-form-item(prop="username")
              el-input(v-model='loginForm.username' placeholder="用户名/手机号" )
            el-form-item(prop="password")
              el-input(v-model='loginForm.password' placeholder="密码")
            el-form-item
              el-button(class="login__btn" type='primary') 登陆
        el-tab-pane(label='注册') 角色管理

</template>

<script>

export default {
  components: {},
  data () {
    return {
      loginForm: [],
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
  }
}
</script>
