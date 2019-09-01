<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.header
  border-bottom 1px solid #eee
  box-shadow 0 1px 5px #eee
.header__topbar
  width 1120px
  height 58px
  margin 0 auto
.header__logo
  width 120px
  height 33px
  text-indent -9999px
  background url('~assets/images/logo.png')
.header__menu
  flex 1
  margin 0 20px
.header__link
  height 58px
  padding 0 20px
  line-height 58px
  color #333
  cursor pointer
  &&:hover
    border-bottom 2px solid $mainColor
    color $mainColor
.header__link_active
  background-color $mainColor
  color #fff
  &&:hover
    color #fff
.header__login
  width 200px
.header__login-link
  font-size 14px
  color $grayTextColor
  &&:hover
    color $mainColor
</style>

<template lang="pug">
.header
  //- S 顶部模块
  el-row(class="header__topbar" type="flex" justify="space-between" align="middle")

    h1(class="header__logo") 马蜂窝旅游网
    //- 头部logo模块

    el-row(class="header__menu" type="flex")
      nuxt-link(class="header__link"
        v-for="(item,index) in menuData"
        :key="item.path"
        :to="item.path"
        :class='["header__link",{"header__link_active":(index===current)}]'
        @click.native.stop="handleClick(index)"
        ) {{ item.name }}
    //- 头部菜单模块

    .header__login
      nuxt-link(to="/user/login" class="header__login-link") 登陆/注册
    //- 头部登陆注册模块

  //- E 顶部模块

</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      /* --------------------------导航菜单数据-------------------------------- */
      menuData: [
        { name: "首页", path: "/" },
        { name: "旅游攻略", path: "/strategy" },
        { name: "酒店", path: "/hotel" },
        { name: "国内机票", path: "/ticket" },
      ],
      current: 0
    }
  },
  methods: {
    handleClick (index) { //处理菜单点击
      this.current = index
    }
  }
}
</script>
