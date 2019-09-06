<style lang='stylus' scoped>
.flights
  width 1000px
  margin 0 auto
</style>
<template lang='pug'>
.flights
  el-row
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
import { mapActions } from 'vuex'
export default {
  name: 'filghts',
  components: {
    FlightsList,
    FlightsStatement,
    FlightsHistory
  },
  validate ({ query }) {
    console.log("TCL: validate -> query", query)
    return true
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      getAirs: 'ticket/getAirs'
    })
  },
  mounted () {
    this.getAirs(this.$route.query).then(res => {
      console.log("TCL: mounted -> res", res)
    })
  }
}
</script>
