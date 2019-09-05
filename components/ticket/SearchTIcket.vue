<style lang='stylus' scoped>
@import '~styl/variables.styl'
.search
  width 358px
  border 1px solid #ddd
  border-top none
.search__item
  flex 1
  padding 10px
  border-top 2px solid #eee
  text-align center
  background #eee
.search__item_active
  border-top 2px solid $mainColor
  background #fff
.search__icon
  margin 0 5px
</style>
<template lang='pug'>
.search
  //- tab标签模块
  el-row.search__tab(type='flex' justify='space-around')
    .search__item(v-for='(item,index) in tabData'
                        :key='index'
                        :class='{"search__item_active":(current===index)}'
                        @click='handleClick(index)'
                        )
      i.search__icon(:class='["iconfont",item.icon]')
      span.search__text {{item.title}}
  //- 单程票
  .search__single(v-if='current===0')
    single-ticket
  //- 往返票
  .search__round(v-if='current===1') 往返
</template>

<script>
import SingleTicket from 'components/ticket/SingleTicket'
export default {
  components: {
    SingleTicket
  },
  data () {
    return {
      /* --------------------------tab栏数据-------------------------------- */
      tabData: [
        { title: '单程', icon: 'icondancheng', },
        { title: '往返', icon: 'iconshuangxiang', }
      ],
      current: 0
    }
  },
  methods: {
    handleClick (index) {
      this.current = index
    }
  }
}
</script>
