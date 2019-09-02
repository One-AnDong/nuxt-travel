<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.tab__tag
  display flex
.tab__link
  position relative
  box-sizing border-box
  width 82px
  height 36px
  padding 5px 10px
  margin-right 10px
  text-align center
  color #ffffff
  &&:before
    position absolute
    top 0
    left 0
    content ''
    width 100%
    height 100%
    transform scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg)
    transform-origin bottom left
    border 1px solid hsla(0, 0%, 100%, 0.2)
    background rgba(0, 0, 0, 0.2)
    z-index -1
.tab__link_active
  color $darkTextColor
  &&:before
    background #eee
.tab__panel
  display flex
.tab__input
  width 100%
  padding 15px
  border-radius 5px
  border-top-left-radius 0
  outline none
  background #fff
.tab__search
  display flex
  justify-content center
  align-items center
  padding 0 10px
  background #fff
.tab__search-icon
  font-size 20px
  font-weight 900
</style>
<template lang='pug'>
.tab
  .tab__tag
    .tab__link(v-for='(item,index) in options'
              :key='index'
              :class="{'tab__link_active':(current===index)}"
              @click='tabClick(index)') {{ item.title }}
  .tab__panel
    input(v-model.tirm='searchCont' class="tab__input" type='text' :placeholder="options[current].placeholder")
    .tab__search(@click='handleSearch')
      i(class='tab__search-icon el-icon-search')
</template>

<script>

export default {
  name: 'tabs',
  props: {
    options: {
      type: Array,
      default: () => {
        return [{ title: 'test', placeholder: 'test' }]
      }
    }
  },
  data () {
    return {
      current: 0,
      searchCont: ''
    }
  },
  methods: {
    tabClick (index) {//点击tab标签切换样式
      if (index === 2) return this.$router.push({ name: 'ticket' })
      this.current = index
    },
    handleSearch () {//点击搜索按钮
      if (!this.searchCont) return this.$message.error('输入城市')
      let name = this.options[this.current].name
      let query = {
        city: this.searchCont
      }
      this.$router.push({ name, query })
    }
  }
}
</script>
