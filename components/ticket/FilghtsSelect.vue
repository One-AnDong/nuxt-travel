<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.select
  margin 20px 0 10px 0
  font-size 14px
.select__item
  margin 0 5px
.list__cancel
  font-size 14px
.list__btn
  margin 0 5px
  padding 7px 15px
  border none
  color #fff
  background-color $mainColor
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
  name: 'FilghtsSelect',
  data () {
    return {
      airport: '',
      company: '',
      departTime: '',
      planeSize: '',
      sizeData: [ //飞机尺寸
        { value: 'L', label: '大' },
        { value: 'M', label: '中' },
        { value: 'S', label: '小' }
      ],
      filters: {
        airport: { key: 'org_airport_name', value: '' },
        company: { key: 'airline_name', value: '' },
        departTime: { key: 'airline_name', value: '' },
        planeSize: { key: 'plane_size', value: '' },
      }
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
      this.setData({ target: 'airport', value: val })
    },
    handleDepartTime (val) { //筛选起飞时间
      this.setData({ target: 'departTime', value: val })
    },
    handleCompany (val) { //筛选航空公司
      this.setData({ target: 'company', value: val })
    },
    handlePlaneSize (val) { //筛选机型
      this.setData({ target: 'planeSize', value: val })
    },
    getFilterData (data, attr, val) { //过滤数据函数
      return data.filter(item => {
        return item[attr] === val
      })
    },
    handleCancel () { //取消筛选
      this.$emit('cancelSelect')
    },
    setData (options) {
      this.filters[options.target].value = options.value
      const data = this.validator()
      console.log(data)
      this.$emit('setTickData', data)
    },
    validator () {//筛选器
      return this.filghtsData.flights.filter(item => {
        let valid = true
        Object.keys(this.filters).map(v => {
          if (!this.filters[v].value) return
          if (v === 'departTime') { //过滤时间需要转换
            const [from, to] = this.filters[v].value.split('-')
            const current = item.dep_time.split(':')[0]
            return valid = current >= from && current < to
          }
          if (item[this.filters[v].key] !== this.filters[v].value) {
            valid = false
          }
        })
        return valid
      })
    }
  }
}
</script>
