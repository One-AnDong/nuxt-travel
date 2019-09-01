<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.footer
  padding-top 30px
  background #3c3c3c
.footer__container
  width 1120px
  margin 0 auto
.footer__info
  padding-bottom 30px
  border-bottom 1px solid $grayTextColor
.footer__title
  height 30px
  font-size 16px
  color $footerTextColor
.footer__item
  font-size 12px
  color $footerTextColor
.footer__item-number
  color $mainColor
.footer__qrcode
  width 120px
  height 120px
.footer__qrcode-img
  width 120px
  height 120px
.footer__qrcode-title
  font-size 12px
  text-align center
  color $footerTextColor
.footer__right
  padding 50px 0
  font-size 12px
  text-align center
  color $footerTextColor
</style>
<template lang='pug'>
.footer
  .footer__container
    el-row(class="footer__info")
      el-col(:span='6' :offset='1')
        h5(class="footer__title") 闲云旅游旅游网
        p(class="footer__item") 上亿旅行者共同打造的
          strong(class="footer__item-number") "旅行神器"
        p(class="footer__item")
          strong(class="footer__item-number") 60,000
          |  多个全球旅游目的地
        p(class="footer__item")
          strong(class="footer__item-number") 600,000
          |  个细分目的地新玩法
        p(class="footer__item")
          strong(class="footer__item-number") 760,000,000
          |  次攻略下载
        p(class="footer__item")
          strong(class="footer__item-number") 38,000
          |  家旅游产品供应商
      el-col(:span='5')
        h5(class="footer__title") 关于我们
        p(class="footer__item") 隐私政策 商标声明
        p(class="footer__item") 服务协议 游记协议
        p(class="footer__item") 商城平台服务协议
        p(class="footer__item") 网络信息侵权通知指引
        p(class="footer__item") 闲云旅游旅游网服务监督员
        p(class="footer__item") 网站地图加入闲云旅游
      el-col(:span='5')
        h5(class="footer__title") 旅行服务
        p(class="footer__item") 旅游攻略 酒店预订
        p(class="footer__item") 旅游特价 国际租车
        p(class="footer__item") 旅游问答 旅游保险
        p(class="footer__item") 旅游指南 订火车票
        p(class="footer__item") 旅游资讯 APP下载
      el-col(:span='6')
        .footer__qrcode
          img(src='http://157.122.54.189:9093/images/1556522965.png' alt class="footer__qrcode-img")
          p(class="footer__qrcode-title") 关注我们

    el-row(class="footer__right")
      p 京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved
</template>

<script>

export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {

  }
}
</script>
