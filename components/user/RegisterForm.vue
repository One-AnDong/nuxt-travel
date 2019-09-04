<style lang='stylus' scoped>
.register__submit
  width 100%
</style>
<template lang='pug'>
//- 注册表单模块
.register
  el-form.form(:model='registerData' ref='register' :rules='rules')
    //- 用户名
    el-form-item.form-item( prop='username')
      el-input(placeholder='用户名手机' v-model='registerData.username')

    //- 验证码框
    el-form-item.form-item(prop='captcha')
      el-input(placeholder='验证码' v-model='registerData.captcha' )
        template(slot='append')
          el-button(@click='handleGetCaptcha') 获取验证码

    //- 昵称
    el-form-item.form-item( prop='nickname')
      el-input(placeholder='你的名字' v-model='registerData.nickname').

    //- 密码
    el-form-item.form-item( prop='password')
      el-input(placeholder='密码' type='password' v-model='registerData.password')

    //- 密码确认
    el-form-item.form-item( prop='checkPassword')
      el-input(placeholder='确认密码' type='password' v-model='registerData.checkPassword')
    el-button.register__submit(type='primary' @click='handleRegSubmit') 注册
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterForm',
  data () {
    const validatePwd = (rules, value, callback) => { //确认密码验证器
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerData.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      /* -----------------------------表单数据-------------------------------- */
      registerData: { //表单对象
        username: '',
        nickname: '',
        captcha: '',
        password: '',
        checkPassword: ''
      },
      captcha: '', //用户请求获取的验证码
      /* --------------------------表单验证规则-------------------------------- */
      rules: {
        username: [
          { required: true, message: '请输入用户名', tigger: 'blur' },
          { pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号' }
        ],
        nickname: [{ required: true, message: '请输入你的名字', tigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', tigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', tigger: 'blur' }],
        checkPassword: [{ validator: validatePwd, tigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions({
      setToken: 'user/setToken',//设置token
      setUserInfo: 'user/setUserInfo',//设置用户信息
      userRegister: 'user/userRegister',//用户注册请求
      getCaptch: 'user/getCaptch'//请求获取验证码
    }),
    /* --------------------------事件处理函数-------------------------------- */
    handleRegSubmit () { //处理表单提交
      this.$refs.register.validate(valid => { //二次表单验证
        if (valid) {
          const { checkPassword, ...data } = this.registerData
          this.userRegister(data).then(res => {
            this.$message.success('注册成功')
            this.setToken(res.data.token)
            this.setUserInfo(res.data.user)
            this.$router.push({ name: 'index' })
          })
        } else {
          this.$message.warning('请输入所有必填数据')
          return false
        }
      })
    },
    handleGetCaptcha () { //处理获取验证码
      if (!this.registerData.username) return
      this.getCaptch(this.registerData.username).then(res => {
        const { code } = res.data
        this.$alert(`模拟生成的验证码为:${code}`, '提示')
        this.captcha = code
      })
    }
  }
}
</script>
