<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
/* layouts样式模块
------------------------------------- */
.login__container
  height 700px
  background url('http://157.122.54.189:9093/images/bar1.jpg') center center no-repeat
.login__main
  width 400px
  border-radius 5px
  box-shadow 0 1px 1px #eee
  background #fff
/* tab标签模块
------------------------------------- */
.login__link
  flex 1
  padding 10px 0
  border-top 2px solid #eee
  text-align center
  color #666
  background-color #eee
.login__link_active
  border-top 2px solid $mainColor
  font-weight bold
  color $mainColor
  background-color #fff
/* tab内容模块
------------------------------------- */
.login__panel
  padding 30px
</style>
<template lang='pug'>
//- 登陆页面模块
.login
  el-row(class='login__container' type='flex' justify='center' align='middle')
    .login__main
      //- tab标签模块
      el-row(class='login__tab' type='flex' justify='space-around')
        span(v-for='(item,index) in ["登陆","注册"]'
              :class='["login__link",{"login__link_active":(current===index)}]'
              :key='index'
              @click='current = index'
              ) {{ item }}
      //- 标签内容
      .login__panel
        login-form(v-if='current===0')
        register-form(v-if='current===1')
</template>

<script>
import LoginForm from '@/components/user/LoginForm'
import LoginRegister from '@/components/user/RegisterForm'
export default {
  components: {
    LoginForm,
    LoginRegister
  },
  data () {
    return {
      current: 0
    }
  },
}
</script>
