<style lang='stylus' scoped>
//@import url(); 引入公共css类

</style>
<template lang='pug'>
.list
  el-row.list__select
    el-col(:span='8') 单程：{{ }}
    el-col(:span='4')
    el-col(:span='4')
    el-col(:span='4')
    el-col(:span='4')

  .list__cancel
    span 筛选:
    el-button(type='primary' round size='small') 撤销
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {

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
