<style lang='stylus' scoped>
@import '~styl/variables.styl'
.ticket
  width 1120px
  margin 0 auto
.ticket__title
  margin 15px 0
  font-weight normal
.ticket__icon-orange
  font-size 20px
  color $mainColor
.ticket__text-orange
  padding 0 5px
  font-size 20px
  color $mainColor
.ticket__icon-blue
  font-size 20px
  color $blueColor
.ticket__text-blue
  padding 0 5px
  font-size 20px
  color $blueColor
.ticket__statement
  margin 20px 0
.ticket__salary
  margin-bottom 50px
</style>
<template lang='pug'>
.ticket
  //- 国内机票标题栏
  h2.ticket__title
    i.ticket__icon-orange.iconfont.iconfeiji
    span.ticket__text-orange 国内机票

  //- 机票预定栏
  el-row.ticket__inland(type='flex' justify='space-between')
    search-ticket
    .ticket__banner
      img(src='/pic_sale.jpeg')
  //- 广告栏
  .ticket__statement
    statement-bar

  //- 特价机票标题栏
  h2.ticket__title
    i.ticket__icon-blue.iconfont.icontejiajipiao
    span.ticket__text-blue 特价机票

  //- 特价机票模块
  el-row.ticket__salary
    ticket-salary
</template>

<script>
import SearchTicket from 'components/ticket/SearchTIcket'
import StatementBar from 'components/ticket/StatementBar'
import TicketSalary from 'components/ticket/TicketSalary'

export default {
  components: {
    SearchTicket,
    StatementBar,
    TicketSalary
  },
  data () {
    return {

    }
  },
  computed: {},
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
