<style lang='stylus' scoped>
.statement
  border 1px solid #ddd
  padding 10px 0
  background #f5f5f5
.statement__item
  flex 1
  text-align center
  +.statement__item
    border-left 1px solid #ddd
.statement__icon
  margin 0 5px
  font-size 30px
  vertical-align middle
.statement__text
  vertical-align middle
</style>
<template lang='pug'>
//- 状态栏目录
el-row.statement
  el-col.statement__item(v-for='(item,index) in barData' :span='8' :key='index')
    i.statement__icon(:class='["iconfont",item.icon]' :style='{color:item.color}')
    span.statement__text {{ item.title }}
</template>

<script>

export default {
  data () {
    return {
      barData: [
        { title: '100%航协认证', icon: 'iconweibiaoti-_huabanfuben', color: '#409EFF' },
        { title: '出行保证', icon: 'iconbaozheng', color: 'green' },
        { title: '7x24小时服务', icon: 'icondianhua', color: '#409EFF' },
      ]
    }
  },
  methods: {

  }
}
</script>
