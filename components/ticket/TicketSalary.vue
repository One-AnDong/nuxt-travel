<style lang='stylus' scoped>
.salary
  border 1px solid #ddd
  padding 20px 10px
.salary__item
  position relative
  margin 0 10px
  height 171px
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

    //- 机票图片
    img.salary__img( :src='item.cover' @click='handleClick(item)')

    //- 机票信息
    p.salary__info
      span.salary__info-city {{ item.departCity + '-' + item.destCity }}
      span.salary__info-price ¥{{ item.price }}
</template>

<script>

export default {
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {

  },
  data () {
    return {
      /* --------------------------------------特价机票数据--------------------------------------- */
      salaryData: [
        { departCity: '广州', departCode: 'CAN', destCity: '北京', destCode: 'BJS', cover: 'http://n4-q.mafengwo.net/s7/M00/2E/D4/wKgB6lSgx0KAAtuCAAVoSPI1DUk40.jpeg?imageMogr2%2Fthumbnail%2F%21750x563r%2Fgravity%2FCenter%2Fcrop%2F%21750x563%2Fquality%2F90', departDate: '2019-09-04', price: '477' },
        { departCity: '广州', departCode: 'CAN', destCity: '天津', destCode: 'TSN', cover: 'http://p2-q.mafengwo.net/s7/M00/6D/1B/wKgB6lSuVEKABi4KAAVchdZie70489.png?imageMogr2%2Fthumbnail%2F%21750x563r%2Fgravity%2FCenter%2Fcrop%2F%21750x563%2Fquality%2F90', departDate: '2019-09-04', price: '465' },
        { departCity: '广州', departCode: 'CAN', destCity: '太原', destCode: 'TYN', cover: 'http://b2-q.mafengwo.net/s5/M00/7B/37/wKgB3FIDDByAcTAFAAPaSajnMyk40.jpeg?imageMogr2%2Fthumbnail%2F%21750x563r%2Fgravity%2FCenter%2Fcrop%2F%21750x563%2Fquality%2F90', departDate: '2019-09-04', price: '439' },
        { departCity: '广州', departCode: 'CAN', destCity: '大连', destCode: 'DLC', cover: 'http://b4-q.mafengwo.net/s5/M00/53/D1/wKgB3FGcJuCAFdf1AAM-uEqmHBw07.jpeg?imageMogr2%2Fthumbnail%2F%21750x563r%2Fgravity%2FCenter%2Fcrop%2F%21750x563%2Fquality%2F90', departDate: '2019-09-04', price: '567 ' }
      ]
    }
  },
  methods: {
    /* --------------------------事件处理函数------------------------------- */
    handleClick (item) { // 处理图片点击
      const { cover, price, ...params } = item
      this.$router.push({ name: 'ticket-flights', query: params })
    },
    /* --------------------------事件请求函数-------------------------------- */
    getSaleTicket () { // 请求获取热买机票
      this.$axios({
        url: '/airs/sale',
      }).then(res => {
        this.salaryData = res.data.data
      })
    }
  },
  mounted () {
    // this.getSaleTicket()
  }
}
</script>
