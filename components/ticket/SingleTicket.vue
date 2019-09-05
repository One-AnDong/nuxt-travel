<style lang='stylus' scoped>
@import '~styl/variables'
.single
  padding 15px 50px 15px 15px
/* 表单模块
--------------------------------- */
.single__form
  position relative
.single__depart
  width 100%
.single__dest
  width 100%
.single__date
  width 100%
.single__submit
  width 100%
  color #fff
  font-size 16px
  background-color $mainColor
/* 切换模块
--------------------------------- */
.single__switch
  position absolute
  top 40px
  right -34px
  width 20px
  height 20px
  text-align center
  color #fff
  background-color #666
.single__switch-text
  position relative
  font-size 12px
  &&:before
    position absolute
    top -23px
    right 5px
    content ''
    width 25px
    height 20px
    border-right 1px solid #ccc
    border-top 1px solid #ccc
  &&:after
    position absolute
    bottom -23px
    right 5px
    content ''
    width 25px
    height 20px
    border-right 1px solid #ccc
    border-bottom 1px solid #ccc
</style>
<template lang='pug'>
//- 单程机票搜索模块
.single
  el-form.single__form(:model='singleForm' ref='singleForm' label-width='80px')

    //- 出发城市搜索框
    el-form-item(label='出发城市')
      el-autocomplete.single__depart(v-model='singleForm.departCity'
                        :fetch-suggestions='querySearchDepart'
                        @select='handleDepartSelect'
                        :debounce='+300'
                        placeholder='请搜索出发城市')

    //- 到达城市搜索框
    el-form-item(label='到达城市')
      el-autocomplete.single__dest(v-model='singleForm.destCity'
                        :fetch-suggestions='querySearchDest'
                        @select='handleDestSelect'
                        :debounce='+300'
                        placeholder='请搜索到达城市')

    //- 出发日期选择框
    el-form-item(label='出发时间')
        el-date-picker.single__date(:disabledDate='handleDisabledDate' type='date' placeholder='选择日期' v-model='singleForm.departDate'          @change='handleDate' )

    //- 确认搜索按钮
    el-form-item
      el-button.single__submit(icon='el-icon-search' type='default' @click='onSubmit') 搜索

    //- 切换模块
    .single__switch(@click='handleSwitch')
      span.single__switch-text 换
</template>

<script>
import moment from 'moment'
export default {
  components: {},
  data () {
    return {
      /* -----------------------------表单数据--------------------------------- */
      singleForm: {
        departCity: '',
        departCode: '',
        destCity: '',
        destCode: '',
        departDate: moment(Date.now()).format('YYYY-MM-DD')
      },
      validator: []
    }
  },
  methods: {
    /* ------------------------------公共函数------------------------------- */
    debounce (fn, wait) {  //防抖函数
      let timer
      return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this, arguments)
        }, wait)
      }
    },
    stateValidtor (target, msg) { //状态器
      if (!target) return msg
    },
    addValidator (target, msg) { //添加状态函数
      this.validator.push(() => { return this.stateValidtor(target, msg) })
    },
    checkForm ({ departCity, destCity, departDate }) { //验证表单
      this.validator.length = 0
      this.addValidator(departCity, '出发城市不能为空')
      this.addValidator(destCity, '到达城市不能为空')
      for (let i = 0, l = this.validator.length; i < l; i++) {
        let res = this.validator[i]()
        if (res) {
          this.$alert(res, '提示')
          return false
        }
      }
      return true
    },
    /* --------------------------事件处理函数-------------------------------- */
    querySearchDepart (queryString, callback) {//处理出发城市输入
      if (!queryString) return callback([])
      this.handleGetCity(queryString).then(data => {
        callback(data)
        //默认选择第一项
        this.singleForm.departCity = data[0].value
        this.singleForm.departCode = data[0].sort
      })
    },
    handleDepartSelect (item) {//处理出发城市选择
      this.singleForm.departCity = item.value
      this.singleForm.departCode = item.sort
    },
    querySearchDest (queryString, callback) { //处理到达城市输入
      if (!queryString) return callback([])
      this.handleGetCity(queryString).then(data => {
        callback(data)
        //默认选择第一项
        this.singleForm.destCity = data[0].value
        this.singleForm.destCode = data[0].sort
      })
    },
    handleDestSelect (item) { //处理到达城市选择
      this.singleForm.destCity = item.value
      this.singleForm.destCode = item.sort
    },
    handleDate (date) { //处理日期选择
      this.singleForm.departDate = moment(date).format('YYYY-MM-DD')
    },
    handleDisabledDate (date) { //处理日期禁用

    },
    handleSwitch () { // 交换两个值
      let tempCity = this.singleForm.departCity
      let tempCode = this.singleForm.departCode
      this.singleForm.departCity = this.singleForm.destCity
      this.singleForm.departCode = this.singleForm.destCode
      this.singleForm.destCity = tempCity
      this.singleForm.destCode = tempCode
    },
    onSubmit () { //处理搜索
      const result = this.checkForm(this.singleForm)
      if (result) {
        this.$router.push({ name: 'ticket-flights', query: this.singleForm })
      }
    },
    /* --------------------------请求处理函数-------------------------------- */
    async getCity (name) {//请求获取城市信息
      let res = await this.$axios({
        url: '/airs/city',
        method: 'GET',
        params: {
          name
        }
      })
      return res
    },
    handleGetCity (queryString) { //二次封装请求
      return this.getCity(queryString).then(res => {
        const { data } = res.data
        const doneData = data.map(item => {
          item.value = item.name.slice(0, -1)
          return item
        })
        return doneData
      })
    }
  }
}
</script>
