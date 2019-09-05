<style lang='stylus' scoped>
.salary
  border 1px solid #ddd
  padding 20px 10px
.salary__item
  position relative
  margin 0 10px
/* 特价机票信息栏模块
------------------------------------- */
.salary__info
  position absolute
  left 0
  bottom 0
  width 100%
  padding 5px 10px
  background-color rgba(0, 0, 0, 0.5)
.salary__info-city
  color #fff
  font-size 14px
.salary__info-price
  float right
  color #fff
/* 特价机票图片模块
------------------------------------- */
.salary__img
  width 100%
  height 100%
</style>
<template lang='pug'>
//- 特价机票模块
el-row.salary(type='flex')
  //- 机票列表
  el-col.salary__item(v-for='(item,index) in salaryData'
                      :span='6'
                      :key='index')
    img.salary__img( :src='item.pic' @click='handleClick(item)')
    p.salary__info
      span.salary__info-city {{ item.departCity + '-' + item.destCity }}
      span.salary__info-price ¥{{ item.price }}
</template>

<script>

export default {
  components: {},
  data () {
    return {
      /* --------------------------------------特价机票数据--------------------------------------- */
      salaryData: [
        { departCity: '广州', departCode: 'CAN', destCity: '上海', destCode: 'SHA', pic: '/sh_1.jpg', departDate: '2019-09-04', price: '699' },
        { departCity: '广州', departCode: 'CAN', destCity: '上海', destCode: 'SHA', pic: '/sh_1.jpg', departDate: '2019-09-04', price: '699' },
        { departCity: '广州', departCode: 'CAN', destCity: '上海', destCode: 'SHA', pic: '/sh_1.jpg', departDate: '2019-09-04', price: '699' },
        { departCity: '广州', departCode: 'CAN', destCity: '上海', destCode: 'SHA', pic: '/sh_1.jpg', departDate: '2019-09-04', price: '699' }
      ]
    }
  },
  methods: {
    /* --------------------------事件处理函数------------------------------- */
    handleClick (item) { // 处理图片点击
      const { pic, price, ...params } = item
      this.$router.push({ name: 'ticket-flights', query: params })
    }
  },
  created () {

  }
}
</script>
