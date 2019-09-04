<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.header
  border-bottom 1px solid #eee
  box-shadow 0 1px 5px #eee
.header__topbar
  width 1120px
  height 58px
  margin 0 auto
/* logo模块
----------------------------------------------- */
.header__logo
  width 120px
  height 33px
  text-indent -9999px
  background url('~assets/images/logo.png')
/* 菜单模块
----------------------------------------------- */
.header__menu
  flex 1
  margin 0 20px
/* 登陆信息模块
----------------------------------------------- */
.header__login
  width 200px
  // height 100%
.header__login-link
  font-size 14px
  color $grayTextColor
  &&:hover
    color $mainColor
</style>

<template lang="pug">
.header
  //-  网站顶部模块
  el-row(class="header__topbar" type="flex" justify="space-between" align="middle")
    //- logo模块、
    h1(class="header__logo") 马蜂窝旅游网

    //- 菜单模块
    .header__menu
      top-nav
    //- 登陆注册模块
    .header__login
      user-info
</template>

<script>
import UserInfo from '@/components/user/UserInfo'
import TopNav from '@/components/common/TopNav'
export default {
  name: 'Header',
  components: {
    UserInfo,
    TopNav
  }
}
</script>
