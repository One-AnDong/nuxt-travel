<style lang='stylus' scoped>
.flights
  width 1000px
  margin 0 auto
.flights__main
  width 745px
</style>
<template lang='pug'>
.flights
  el-row(type='flex' justify='space-between')
    el-col.flights__main(:span='20')
      flights-list
    el-col.flights__sider(:span='4')
      //- flights-statement
      //- flights-history

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
    FlightsHistory
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
