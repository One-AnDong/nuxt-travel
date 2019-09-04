<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.info
  width 100%
  height 100%
.info__avatar
  width 36px
  height 36px
  border 2px solid #ffffff
  border-radius 50%
  vertical-align middle
  box-sizing border-box
  &&:hover
    border 2px solid $mainColor
</style>
<template lang='pug'>
.info
  nuxt-link(v-if="!token" to="/user/login" class="header__login-link") 登陆/注册
  el-dropdown(v-else)
    span.el-dropdown-link
      img(class="info__avatar" :src="`${$axios.defaults.baseURL}${userInfo.defaultAvatar}`")
      span {{ userInfo.nickname }}
      i.el-icon-arrow-down.el-icon--right
    el-dropdown-menu(slot='dropdown')
      el-dropdown-item 个人中心
      el-dropdown-item(@click.native='handleBack') 退出
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {
    ...mapState(
      {
        userInfo: state => state.user.userInfo,
        token: state => state.user.token
      }
    )
  },
  methods: {
    ...mapMutations({
      clearUserInfo: 'user/CLEARN_USERINFO'
    }),
    handleBack () {
      this.clearUserInfo()
      // this.$router.push({name:'/'})
    }
  },
  mounted () {
    console.log(this.userInfo)
  }
}
</script>
