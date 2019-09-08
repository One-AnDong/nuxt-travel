<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.item
  border 1px solid #ddd
  padding 28px
  margin-bottom 10px
  cursor pointer
.item__name
  font-size 14px
  text-align center
.item__name-airline
  margin-right 5px
// 
.item__main
  padding 0 30px
.item__depart
  text-align center
.item__dest
  text-align center
// 
.item__time
  font-size 24px
  font-weight 400
.item__airport
  font-size 12px
  color #999
.item__dis
  margin-top -10px
  text-align center
.item__distime
  padding-bottom 13px
  border-bottom 1px solid #eee
  font-size 14px
  color #999
.item__price
  text-align center
.item__pirce-text
  font-size 24px
  margin 0 2px
  color $mainColor
/* 机票详情模块
------------------------------------------------------- */
.recommend
  margin-top -11px
  margin-bottom 10px
  border 1px solid #ddd
  background-color #f6f6f6
.recommend__title
  font-size 14px
  text-align center
.recommend__item
  padding 20px 0
  border-bottom 1px solid #eee
.recommend__name
  font-size 12px
  color green
.recommend__supplier
  font-size 12px
.recommend__price
  font-size 20px
  color $mainColor
.recommend__btn
  color #fff
  background-color $mainColor
.recommend__count
  color #666666
  font-size 14px
</style>
<template lang='pug'>
div
  //- 航班信息模块
  el-row.item(type='flex' align='middle' @click.native='handleClick'  )

    //- 航空信息
    el-col.item__name(:span='6')
      span.item__name-airline {{ data.airline_name }}
      span.item__name-number {{ data.flight_no }}

    //- 时间
    el-col.item__date(:span='12')
      el-row.item__main(type='flex' align='middle')
        //- 起飞时间
        el-col.item__depart(:span='8')
          strong.item__time {{ data.dep_time}}
          p.item__airport {{ data.org_airport_name + data.org_airport_quay}}
        //- 时长
        el-col.item__dis(:span='8')
          span.item__distime {{ disTime }}
        //- 到达时间
        el-col.item__dest(:span='8')
          strong.item__time {{ data.arr_time }}
          p.item__airport {{ data.dst_airport_name+data.dst_airport_quay }}

    //- 价格
    el-col.item__price(:span='6')
      span ¥
      span.item__pirce-text {{ data.base_price/2 }}
      span 起

  //- 机票详情模块
  el-row.recommend(type='flex' justify='space-between' align='middle' v-show='isShow')
    el-col.recommend__title(:span='4') 低价推荐
    el-col.recommend__list(:span='20')
      el-row.recommend__item(v-for='(item,index) in data.seat_infos' :key='index' type='flex' justify='space-between' align='middle')
        el-col(:span='16')
          span.recommend__name {{ item.name }}
          span.recommend__supplier {{ ' | ' + item.supplierName }}
        el-col(:span='4')
          span.recommend__price {{ ' ¥ ' + item.org_settle_price }}
        el-col(:span='4')
          el-button.recommend__btn(size='small') 选定
          p.recommend__count {{ '剩余:' + item.discount }}
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    disTime () { //计算时间差
      const depart = this.data.dep_time.split(':')
      const dest = this.data.arr_time.split(':')
      if (dest[0] < depart[0]) {
        dest[0] = +dest[0] + 24
      }
      const disTime = (dest[0] * 60 + +dest[1]) - (depart[0] * 60 + +depart[1])
      return `${Math.floor(disTime / 60)}时${disTime % 60}分`
    }
  },
  methods: {
    handleClick () {
      this.isShow = !this.isShow
    }
  }
}
</script>
