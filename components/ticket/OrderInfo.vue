<style lang='stylus' scoped>
.aside
  width 350px
  height fit-content
  border 1px #ddd solid
.air-info
  padding 15px
  .info-top
    margin-bottom 10px
    > div:last-child
      font-size 14px
  .info-step
    .flight-airport
      strong
        display block
        font-size 22px
        font-weight normal
      span
        font-size 12px
        color #999
    .flight-time
      text-align center
      font-size 12px
      color #999
      span
        display block
.info-bar
  border-top 1px #ddd dashed
  padding 10px 15px
  font-size 14px
  color #666
  .price
    font-size 28px
    color orange
</style>
<template lang='pug'>
 .aside
  .air-info
    el-row.info-top(type='flex' justify='space-between')
      div {{data.dep_date}}
      div {{data.org_city_name}} - {{data.dst_city_name}}
    el-row.info-step(type='flex' justify='space-between' align='middle')
      el-col.flight-airport(:span='5')
        strong {{data.dep_time}}
        span {{data.org_airport_name}}{{data.org_airport_quay}}
      el-col.flight-time(:span='14')
        span --- {{rankTime}} ---
        span {{data.airline_name}}{{data.flight_no}}
      el-col.flight-airport(:span='5')
        strong {{data.arr_time}}
        span 浦东机场T2
  el-row.info-bar(type='flex' justify='space-between')
    span 订单总价
    span 金额
    span 数量
  el-row.info-bar(type='flex' justify='space-between')
    span 成人机票
    span ￥{{data.seat_infos.org_settle_price}}
    span x{{count}}
  el-row.info-bar(type='flex' justify='space-between')
    span 机建＋燃油
    span ¥{{data.airport_tax_audlet}}/人/单程
    span x{{count}}
  el-row.info-bar(type='flex' justify='space-between' align='middle')
    span 应付总额：
    span.price ￥ {{ airsPrice }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      airsPrice: (state) => {
        return state.ticket.airsPrice
      },
      data: (state) => {
        return state.ticket.airsInfo
      },
      count: (state) => {
        return state.ticket.count
      }
    }),
    rankTime () {
      // 数据还未请求回来
      if (!this.data.dep_time) return "";

      // 转化为分钟
      const dep = this.data.dep_time.split(":");
      const arr = this.data.arr_time.split(":");
      const depVal = dep[0] * 60 + +dep[1];
      const arrVal = arr[0] * 60 + +arr[1];

      // 到达时间相减得到分钟
      let dis = arrVal - depVal;

      // 如果是第二天凌晨时间段，需要加24小时
      if (dis < 0) {
        dis = arrVal + 24 * 60 - depVal;
      }

      // 得到相差时间
      return `${Math.floor(dis / 60)}时${dis % 60}分`
    }
  },
}
</script>
