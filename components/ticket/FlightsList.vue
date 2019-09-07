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
.list__pagation
  margin 10px 0
.list__warning
  text-align center
  color #999
</style>
<template lang='pug'>
.list
  //-  列表筛选栏模块
  el-row.select(type='flex' justify='space-between' align='middle')
    el-col(:span='8') 单程：{{ `${info.departCity }-${info.destCity }/${info.departDate}`}}
    //- 起飞机场
    el-col.select__item(:span='4')
      el-select(v-model='airport' placeholder='起飞机场' @change='handleAirport')
        el-option(v-for='(item,index) in options.airport'
                  :key='index'
                  :label='item'
                  :value='item')
    //- 起飞机场
    el-col.select__item(:span='4')
      el-select(v-model='departTime' placeholder='起飞时间' @change='handleDepartTime')
        el-option(v-for='(item,index) in options.flightTimes'
                  :key='index'
                  :label='`${item.from}:00 - ${item.to}:00`'
                  :value='`${item.from}:00 - ${item.to}:00`')
    //- 起飞机场
    el-col.select__item(:span='4')
      el-select(v-model='company' placeholder='航空公司'  @change='handleCompany')
        el-option(v-for='(item,index) in options.company' :key='index' :label='item' :value='item')
    //- 起飞机场
    el-col.select__item(:span='4' )
      el-select(v-model='planeSize' placeholder='机型' @change='handlePlaneSize')
        el-option(v-for='(item,index) in sizeData' :key='index' :label='item.text' :value='item.value')

  //- 取消筛选
  .list__cancel
    span 筛选:
    el-button.list__btn(round size='small') 撤销

  //- 机票列表
  .list__filghts
    filghts-header
    filghts-item(v-for='item in ticketData' :data='item' )
    .list__warning(v-if='ticketData.length===0' ) 暂无航班信息！
  //- 机票分页
  .list__pagation
    el-pagination(@size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='pageNum' :page-sizes='[5, 10, 15, 20]' :page-size='pageSize' layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='ticketData.length>0')


</template>

<script>
import { mapActions, mapState } from 'vuex'
import FilghtsItem from 'components/ticket/FilghtsItem'
import FilghtsHeader from 'components/ticket/FilghtsHeader'
export default {
  components: {
    FilghtsItem,
    FilghtsHeader
  },
  data () {
    return {
      info: {
        departCity: '',
        departDate: '',
        destCity: ''
      },
      options: {
        airport: [],
        company: [],
        flightTimes: []
      },
      sizeData: [
        { value: 'L', text: '大' },
        { value: 'M', text: '中' },
        { value: 'S', text: '小' }
      ],
      airport: '',
      company: '',
      departTime: '',
      planeSize: '',
      ticketData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0
    }
  },
  computed: {
    ...mapState({
      filghtsData: state => state.ticket.filghtsData
    }),
    tiket () {
      return this.ticketData
    }
  },
  methods: {
    ...mapActions({
      getAirs: 'ticket/getAirs'
    }),
    /* --------------------------分页功能-------------------------------- */
    handleSizeChange (val) {
      this.pageSize = val
      this.getTicketData(this.filghtsData.flights)
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getTicketData(this.filghtsData.flights)
    },
    getTicketData (data) {
      this.ticketData = data.filter((item, index) => {
        return index >= (this.pageNum - 1) * this.pageSize && index < this.pageNum * this.pageSize
      })
      this.total = data.length
    },
    /* --------------------------筛选功能-------------------------------- */
    handleAirport (val) {
      const newData = this.filghtsData.flights.filter(item => {
        return item.org_airport_name === val
      })
      this.getTicketData(newData)
    },
    handleDepartTime () { },
    handleCompany (val) {
      const newData = this.filghtsData.flights.filter(item => {
        return item.airline_name === val
      })
      this.getTicketData(newData)
    },
    handlePlaneSize (val) {
      const newData = this.filghtsData.flights.filter(item => {
        return item.plane_size === val
      })
      this.getTicketData(newData)
    }
  },
  async mounted () {
    await this.getAirs(this.$route.query)
    this.info = this.filghtsData.info
    this.options = this.filghtsData.options
    this.getTicketData(this.filghtsData.flights)
  }
}
</script>
