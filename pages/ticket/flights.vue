<style lang='stylus' scoped>
.flights
  width 1000px
  margin 0 auto
.flights__main
  width 745px
.flights__sider
  width 240px
.filghts__statement
  margin 20px 0
</style>
<template lang='pug'>
.flights
  el-row(type='flex' justify='space-between')
    el-col.flights__main(:span='20')
      flights-list
    el-col.flights__sider(:span='4')
      flights-statement
      flights-history

</template>
<script>
import FlightsList from 'components/ticket/FlightsList'
import FlightsStatement from 'components/ticket/FlightsStatement'
import FlightsHistory from 'components/ticket/FlightsHistory'
export default {
  name: 'filghts',
  components: {
    FlightsList,
    FlightsStatement,
    FlightsHistory,
  },
  validate ({ query }) {
    return true
  },
  data () {
    return {
    }
  }
}
</script>
