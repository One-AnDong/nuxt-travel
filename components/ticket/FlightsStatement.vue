<style lang='stylus' scoped>
.statement
  margin 20px 0
  border 1px solid #ddd
.statement__banner
  padding 10px
.statement__item
  flex 1
  text-align center
.statement__icon
  margin 0 5px
  font-size 45px
  vertical-align middle
.statement__text
  font-size 12px
  vertical-align middle
.statement__info
  padding 5px 10px
  font-size 14px
  background-color #f6f6f6
</style>
<template lang='pug'>
//- 状态栏目录
el-row.statement
  el-row.statement__banner(type='flex' justify='space-around' )
    el-col.statement__item(v-for='(item,index) in barData'
                            :span='8'
                            :key='index')
      i.statement__icon(:class='["iconfont",item.icon]'
                        :style='{color:item.color}')
      p.statement__text {{ item.title }}
  el-row.statement__info
    el-col
      p 免费客服电话：4006345678转2
</template>

<script>

export default {
  components: {},
  data () {
    return {
      barData: [
        { title: '航协认证', icon: 'iconweibiaoti-_huabanfuben', color: '#409EFF' },
        { title: '出行保证', icon: 'iconbaozheng', color: 'green' },
        { title: '7x24', icon: 'icondianhua', color: '#409EFF' },
      ]
    }
  },
  methods: {

  }
}
</script>
