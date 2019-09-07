<style lang='stylus' scoped>
.header
  margin 10px 0
  padding 10px
  border 1px solid #ddd
  background-color #f6f6f6
.header__item
  flex 1
  text-align center
  font-size 12px
  color #666
</style>
<template lang='pug'>
el-row.header(type='flex' justify='space-around')
  span.header__item(v-for='item in headerData') {{item.text}}
</template>

<script>

export default {
  name: 'FilghtsHeader',
  data () {
    return {
      headerData: [
        { text: '航空信息' },
        { text: '起飞时间' },
        { text: '到达时间' },
        { text: '价格' },
      ]
    }
  },
}
</script>
