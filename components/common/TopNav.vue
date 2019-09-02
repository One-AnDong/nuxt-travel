<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.nav__link
  height 58px
  padding 0 20px
  line-height 58px
  color #333
  cursor pointer
  &&:hover
    border-bottom 2px solid $mainColor
    color $mainColor
.nuxt-link-exact-active
  background-color $mainColor
  color #fff
  &&:hover
    color #fff
</style>
<template lang='pug'>
//- 菜单模块
el-row(class="nav" type="flex")
  nuxt-link(class="nav__link"
        v-for="(item,index) in menuData"
        :key="item.name"
        :to="item.name") {{ item.title }}
</template>

<script>

export default {
  name: 'TopNav',
  data () {
    return {
      /* --------------------------导航菜单数据-------------------------------- */
      menuData: [
        { title: "首页", name: "/" },
        { title: "旅游攻略", name: "strategy" },
        { title: "酒店", name: "hotel" },
        { title: "国内机票", name: "ticket" },
      ]
    }
  }
}
</script>
