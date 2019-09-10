<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.pay
  padding 30px 0
  background-color #f5f5f5
.pay__inner
  width 1000px
  margin 0 auto
.pay__head
  display flex
  justify-content flex-end
  // align-items center
.pay__text
  margin 0 10px
  align-self flex-end
  font-size 16px
.pay__price
  font-size 28px
  font-weight blod
  color #ff4500
.pay__main
  margin-top 10px
  padding 30px
  border-top 5px solid $mainColor
  background-color #fff
.pay__title
  margin-bottom 10px
  font-size 28px
  font-weight 400
.pay__content
  display flex
  justify-content space-around
  align-items center
.pay__qrcode
  display flex
  flex-direction column
  align-items center
  border 1px solid #ddd
  padding 15px
.pay__qrcode-img
  // width 200px !important
  // height 200px !important
.pay__qrcode-info
  margin-bottom 5px
  font-size 16px
</style>
<template lang='pug'>
.pay
  .pay__inner
    .pay__head
      span.pay__text 支付总金额
      span.pay__price ¥{{ airsPrice.toFixed(2) }}
    .pay__main
      h4.pay__title 微信支付
      .pay__content
        .pay__qrcode
          canvas.pay__qrcode-img
          p.pay__qrcode-info 请使用微信扫一扫
          p.pay__qrcode-info 扫描二维码支付
        .pay__img
          img(src='/wx-sweep2.jpg')
</template>

<script>
import QRCode from 'qrcode'
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  data () {
    return {
      id: 0,
      nonce_str: 0,
      out_trade_no: '',
      // timer: null
    }
  },
  computed: {
    ...mapState({
      airsPrice: (state) => state.ticket.airsPrice
    })
  },
  methods: {
    ...mapActions({
      getAirorders: 'ticket/getAirorders',
      getPayStatus: 'ticket/getPayStatus'
    }),
    setQrCode () {//生成二维码
      setTimeout(() => {
        this.getAirorders(this.$route.query.id).then(res => {
          const { data } = res
          var ele = document.querySelector('canvas')
          QRCode.toCanvas(ele, data.payInfo.code_url, {
            width: 250,
            height: 250
          })
          this.nonce_str = data.payInfo.nonce_str
          this.out_trade_no = data.payInfo.order_no
          this.id = data.id
        })
      }, 0)
    },
    checkPay () {//检查订单支付状态
      const data = {
        id: this.id,
        nonce_str: this.nonce_str,
        out_trade_no: this.out_trade_no
      }
      return this.getPayStatus(data)
    },
    checkLoop () {
      this.timer = setInterval(() => {
        this.checkPay().then(res => {
          console.log(res.data)
          if (res.data.trade_state === 'SUCCESS') {
            this.$confirm('订单支付成功', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success'
            })
            clearInterval(this.timer)
          }
        })
      }, 3000)
    }
  },
  mounted () {
    this.setQrCode()
    this.checkLoop()
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
