<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.history
  width 100%
  border 1px solid #ddd
  padding 0 10px
.history__head
  padding 10px 0
  border-bottom 1px solid #ddd
.history__item
  margin 20px 0
.history__btn
  border none
  color #fff
  background-color $mainColor
.history__city
  font-size 14px
.history__time
  font-size 12px
  color #666
</style>
<template lang='pug'>
.history
  .history__head
    span 历史查询
  .history__main
    el-row.history__item(v-for='(item,index) in  airsHistory'
                        type='flex'
                        :key='index'
                        @click.native='handleClick(index)')
      el-col.history__info
        p.history__city {{ item.info.departCity + '- ' + item.info.destCity}}
        p.history__time {{ item.info.departDate }}
      el-row
        el-button.history__btn(size='mini') 选择
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      airsHistory: (state) => {
        return state.ticket.airsHistory
      }
    })
  },
  watch: {},
  methods: {
    ...mapMutations({
      SWITCH_DATA: 'ticket/SWITCH_DATA'
    }),
    handleClick (index) {
      console.log('su')
      this.SWITCH_DATA(index)
    }
  },
  created () {

  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { }
}
</script>
