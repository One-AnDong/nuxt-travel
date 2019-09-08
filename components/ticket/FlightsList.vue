<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.list__pagation
  margin 10px 0
.list__warning
  text-align center
  color #999
</style>
<template lang='pug'>
.list
  //-  列表筛选栏模块
  filghts-select(@setTickData='setTickData' @cancelSelect='cancelSelect' )

  //- 机票列表
  .list__filghts
    filghts-header
    div(v-loading='loading')
      filghts-item(v-for='item in ticketData'
                  :data='item'
                  :key='item.id' )
      .list__warning(v-if='ticketData.length===0' ) 暂无航班信息！

  //- 机票分页
  .list__pagation
    el-pagination(@size-change='handleSizeChange'
                  @current-change='handleCurrentChange'
                  :current-page='pageNum'
                  :page-sizes='[5, 10, 15, 20]'
                  :page-size='pageSize'
                  layout='total, sizes, prev, pager, next, jumper'
                  :total='total'
                  v-if='ticketData.length>0')


</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import FilghtsSelect from 'components/ticket/FilghtsSelect'
import FilghtsItem from 'components/ticket/FilghtsItem'
import FilghtsHeader from 'components/ticket/FilghtsHeader'
export default {
  components: {
    FilghtsSelect,
    FilghtsItem,
    FilghtsHeader
  },
  data () {
    return {
      cacheTickData: [],//筛选临时数据
      ticketData: [],//机票数据
      /* --------------------------撤销数据-------------------------------- */
      pageNum: 1,
      pageSize: 5,
      total: 0,
      loading: true//加载选项
    }
  },
  computed: {
    ...mapState({ //机票数据
      filghtsData: state => state.ticket.currentData
    })
  },
  watch: {
    filghtsData (val) { //监听数据变化刷新页面
      this.getTicketData(val.flights)
    }
  },
  methods: {
    ...mapActions({
      getAirs: 'ticket/getAirs'
    }),
    setTickData (data) {
      this.pageNum = 1
      this.cacheTickData = data
      this.getTicketData(this.cacheTickData)
    },
    cancelSelect () {
      this.getTicketData(this.filghtsData.flights)
      this.cacheTickData.length = 0
    },
    /* --------------------------分页功能-------------------------------- */
    handleSizeChange (val) {//选择一页多少条数据
      this.pageSize = val
      if (this.cacheTickData.length === 0) {
        return this.getTicketData(this.filghtsData.flights)
      }
      this.getTicketData(this.cacheTickData)
    },
    handleCurrentChange (val) {//选择页数
      this.pageNum = val
      if (this.cacheTickData.length === 0) {
        return this.getTicketData(this.filghtsData.flights)
      }
      this.getTicketData(this.cacheTickData)
    },
    getTicketData (data) {//获取机票数据
      this.ticketData = data.filter((item, index) => {
        return index >= (this.pageNum - 1) * this.pageSize && index < this.pageNum * this.pageSize
      })
      this.total = data.length
    }
  },
  async mounted () {
    await this.getAirs(this.$route.query)
    this.loading = false
  }
}
</script>
