<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.header
  border-bottom 1px solid #eee
  box-shadow 0 1px 5px #eee
  background #fff
.header__topbar
  display flex
  justify-content space-between
  align-items center
  width 1120px
  height 58px
  margin 0 auto
.header__logo
  flex 3
  width 120px
  height 33px
  line-height 58px
  background url('~assets/images/logo.png')
.header__menu
  flex 10
  display flex
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
.header__message
  flex 1
.header__login
  flex 2
</style>

<template lang="pug">
.header

  .header__topbar

    h1(class="header__logo")
    //- 头部logo模块

    .header__menu
      nuxt-link(v-for="(item,index) in menuData" :key="item.path" :to="item.path" :class="{'header__link':true,'header__link_active':current===index}" @click.native.stop="handleClick(index)") {{ item.name }}
    //- 头部菜单模块

    .header__message
      el-dropdown
        .el-dropdown-link
          i.el-icon-bell
          span 消息
          i.el-icon-caret-bottom.el-icon--right
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item 消息
    //- 头部信息模块

    .header__login 登陆/注册
    //- 头部登陆注册模块

</template>

<script>

export default {
  components: {},
  data () {
    return {
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
    handleClick (index) {//处理菜单点击
      this.current = index
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
