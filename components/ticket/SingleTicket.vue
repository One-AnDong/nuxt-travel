<style lang='stylus' scoped>
.single
  padding 15px 50px 15px 15px
.single__submit
  width 100%
</style>
<template lang='pug'>
//- 单程机票搜索模块
.single
  el-form(:model='singleForm' :rules='singleRules' ref='singleForm' label-width='80px')
      el-form-item(label='出发城市' prop='departCity')
        el-input(v-model='singleForm.departCity' placeholder='请搜索出发城市')
      el-form-item(label='到达城市' prop='destCity')
        el-input(v-model='singleForm.destCity' placeholder='请搜索到达城市')
      el-form-item(label='出发时间' prop='departDate')
          el-date-picker(type='date' placeholder='选择日期' v-model='singleForm.departDate' style='width:100%')
      el-form-item
        el-button.single__submit(type='primary' icon='el-icon-search' @click='onSubmit') 搜索
</template>

<script>

export default {
  components: {},
  data () {
    return {
      /* -----------------------------表单数据--------------------------------- */
      singleForm: {
        departCity: '',
        departCode: '',
        destCity: '',
        destCod: '',
        departDate: Date.now()
      },
      /* --------------------------表单验证规则-------------------------------- */
      singleRules: {

      }
    }
  },
  computed: {},
  methods: {
    /* --------------------------事件处理函数-------------------------------- */
    onSubmit () { //处理搜索

    }
  }
}
</script>
