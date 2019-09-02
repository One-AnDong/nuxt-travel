<style lang='stylus' scoped>
.login__btn
  width 100%
</style>
<template lang='pug'>
//- 登陆表单模块
.login
  el-form(ref='loginForm' :model='loginForm' :rules='loginRules')
    el-form-item(prop='username')
      el-input(v-model='loginForm.username' placeholder='用户名/手机号' )
    el-form-item(prop='password')
      el-input(v-model='loginForm.password' placeholder='密码' type='password')
    el-form-item
      el-button(class='login__btn' type='primary' @click='handleClick') 登陆
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginForm',
  data () {
    return {
      /* --------------------------表单数据-------------------------------- */
      loginForm: {
        username: '13800138000',
        password: '123456'
      },
      /* --------------------------表单验证规则----------------------------- */
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setToken', 'setUserInfo']),
    /* --------------------------事件处理函数-------------------------------- */
    handleClick () {//登陆按钮
      this.$refs.loginForm.validate(valid => {
        if (!valid) return this.$message.error('请输入账户/密码')
        this.handleLogin()
      })
    },
    /* --------------------------请求处理函数-------------------------------- */
    async handleLogin () {
      let res = await this.setLogin(this.loginForm)
      const { data } = res
      //将token和用户信息保存到vuex
      this.setToken(data.token)
      this.setUserInfo(data.user)
    },
    /* --------------------------接口函数-------------------------------- */
    setLogin (data) {
      return this.$axios({
        url: '/accounts/login',
        method: 'POST',
        data
      })
    }
  }
}
</script>
