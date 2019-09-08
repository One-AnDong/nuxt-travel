<style lang='stylus' scoped>
// @import url(); 引入公共css类
.order
  width 1000px
  margin 20px auto
.order__aside
  width 350px
  height fit-content
</style>
<template lang='pug'>
.order
  el-row(type='flex' justify='space-between')

    //- 订单表单模块
    .order__main
      order-form

    //- 订单详情模块
    .order__aside
      order-info

</template>

<script>
import OrderInfo from 'components/ticket/OrderInfo'
import OrderForm from 'components/ticket/OrderForm'
export default {
  name: 'order',
  components: {
    OrderInfo,
    OrderForm
  }
}
</script>
