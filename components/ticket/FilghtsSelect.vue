<style lang='stylus' scoped>
//@import url(); 引入公共css类

</style>
<template lang='pug'>
.select
  //-  列表筛选栏模块
  el-row.select(type='flex' justify='space-between' align='middle')
    el-col(:span='8') 单程：{{ `${filghtsData.info.departCity }-${filghtsData.info.destCity }/${filghtsData.info.departDate}`}}
    //- 起飞机场
    el-col.select__item(:span='4')
      el-select(v-model='airport' placeholder='起飞机场' @change='handleAirport')
        el-option(v-for='(item,index) in filghtsData.options.airport'
                  :key='index'
                  :label='item'
                  :value='item')
    //- 起飞机场
    el-col.select__item(:span='4')
      el-select(v-model='departTime' placeholder='起飞时间' @change='handleDepartTime')
        el-option(v-for='(item,index) in filghtsData.options.flightTimes'
                  :key='index'
                  :label='`${item.from}:00 - ${item.to}:00`'
                  :value='`${item.from}-${item.to}`')
    //- 起飞机场
    el-col.select__item(:span='4')
      el-select(v-model='company' placeholder='航空公司'  @change='handleCompany')
        el-option(v-for='(item,index) in filghtsData.options.company' :key='index' :label='item' :value='item')
    //- 起飞机场
    el-col.select__item(:span='4' )
      el-select(v-model='planeSize' placeholder='机型' @change='handlePlaneSize')
        el-option(v-for='(item,index) in sizeData' :key='index' :label='item.label' :value='item.value')

  //- 取消筛选
  .list__cancel
    span 筛选:
    el-button.list__btn(round size='small' @click='handleCancel') 撤销
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      filghtsData: state => state.ticket.currentData
    })
  },
  methods: {
    /* --------------------------筛选功能-------------------------------- */
    handleAirport (val) { //筛选起飞机场
      const data = this.getFilterData(this.filghtsData.flights, 'org_airport_name', val)
      this.$emit('setTickData', data)
      this.cacheTickData = data
      this.getTicketData(this.cacheTickData)
    },
    handleDepartTime (val) { //筛选起飞时间
      this.pageNum = 1
      const time = val.split('-')
      let from = time[0] * 60
      let to = time[1] * 60
      const data = this.filghtsData.flights.filter(item => {
        const date = item.dep_time.split(':')
        if (date[0] === '0') {
          date[0] = 24
        }
        let time = date[0] * 60 + +date[1]
        return time >= from && time <= to
      })
      this.cacheTickData = data
      this.getTicketData(data)
    },
    handleCompany (val) {//筛选h航空公司
      this.pageNum = 1
      const data = this.getFilterData(this.filghtsData.flights, 'airline_name', val)
      this.cacheTickData = data
      this.getTicketData(data)
    },
    handlePlaneSize (val) { //筛选机型
      this.pageNum = 1
      const data = this.getFilterData(this.filghtsData.flights, 'plane_size', val)
      this.cacheTickData = data
      this.getTicketData(data)
    },
    getFilterData (data, attr, val) { //过滤数据函数
      return data.filter(item => {
        return item[attr] === val
      })
    },
    handleCancel () {//取消筛选
      this.getTicketData(this.filghtsData.flights)
      this.cacheTickData.length = 0
    }
  }
}
</script>
