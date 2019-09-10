<style lang='stylus' scoped>
@import '~assets/stylus/variables.styl'
.air-column
  border-bottom 1px #ddd dashed
  padding-bottom 20px
  margin-bottom 20px
.air-column h2
  margin-bottom 20px
  font-size 22px
  font-weight normal
/deep/ .el-select .el-input
  width 130px
.input-with-select
  width 590px
.input-with-select /deep/ .el-input-group__prepend
  background-color #fff
.member-info /deep/ .el-form-item
  margin-bottom 0
.member-info-item
  border-bottom 1px #eee dashed
  padding-bottom 20px
  position relative
  &:first-child
    .delete-user
      display none
.add-member
  margin-top 20px
.delete-user
  display block
  background #ddd
  width 16px
  height 16px
  font-size 14px
  text-align center
  line-height 16px
  color #fff
  cursor pointer
  border-radius 50px
  position absolute
  right -30px
  top 50%
.insurance
  > div
    margin-top 10px
.insurance-item
  margin-bottom 20px
.contact
  /deep/ .el-input
    width 50%
.submit
  display block
  height 50px
  width 250px
  margin 50px 60px
  border none
  color #fff
  background-color $mainColor
</style>
<template lang="pug">
.main
  .air-column
    h2 乘机人
    el-form.member-info
      .member-info-item(v-for='(item,index) in users' :key='index')
        el-form-item(label='乘机人类型')
          el-input.input-with-select(placeholder='姓名' v-model='item.username')
            el-select(slot='prepend' value='1' placeholder='请选择')
              el-option(label='成人' value='1')
        el-form-item(label='证件类型')
          el-input.input-with-select(placeholder='证件号码' v-model='item.id')
            el-select(slot='prepend' value='1' placeholder='请选择')
              el-option(label='身份证' value='1' :checked='true')
        span.delete-user(@click='handleDeleteUser(index)') -
    el-button.add-member(type='primary' @click='handleAddUsers') 添加乘机人
  .air-column
    h2 保险
    div
      .insurance-item(v-for='(item,index) in data.insurances' :key='index')
        el-checkbox(:label='`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`' border  @change='handleInsurance(index,item.id)')

  .air-column
    h2 联系人
    .contact
      el-form(label-width='60px')
        el-form-item(label='姓名')
          el-input(v-model='contactName')
        el-form-item(label='手机')
          el-input(placeholder='请输入内容' v-model='contactPhone')
            template(slot='append')
              el-button(@click="handleSendCaptcha") 发送验证码
        el-form-item(label='验证码' )
          el-input(v-model='captcha')
      el-button.submit( @click='handleSubmit') 提交订单
      p(v-show='false') {{ getPrice }}
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      users: [{ username: '', id: '' }],//乘客数据
      insurances: [], //保险数据
      contactName: '',
      contactPhone: '13800138000',
      invoice: false,
      captcha: '000000',
      seat_xid: '',
      air: 0
    }
  },
  computed: {
    ...mapState({
      token: (state) => {
        return state.user.token
      },
      airsPrice: (state) => {
        return state.ticket.airsPrice
      },
      data: (state) => {
        return state.ticket.airsInfo
      },
      count: (state) => {
        return state.ticket.count
      }
    }),
    getPrice () {
      let price = 0
      price += this.data.seat_infos.org_settle_price
      price += this.data.airport_tax_audlet
      this.data.insurances.map(item => {
        if (this.insurances.indexOf(item.id) > -1) {
          price += item.price
        }
      })
      price = price * this.users.length
      this.setPrice(price)
      this.setCount(this.users.length)
      return price
    }
  },
  methods: {
    ...mapMutations({
      setPrice: 'ticket/SET_AIRSPRICE',
      setCount: 'ticket/SET_COUNT'
    }),
    ...mapActions({
      getCaptch: 'user/getCaptch',
      setAirorders: 'ticket/setAirorders'
    }),
    /* --------------------------事件处理函数-------------------------------- */
    handleAddUsers () { // 添加乘机人
      this.users = [...this.users, { username: '', id: '' }]
    },
    handleDeleteUser (val) {  // 移除乘机人
      this.users = this.users.filter((item, index) => {
        return index !== val
      })
    },
    handleSendCaptcha () { // 发送手机验证码
      const tel = this.contactPhone
      if (!/^1[0-9]{10}$/.test(tel)) return this.$message.warning('请输入正确的手机号码')
      this.getCaptch(tel).then(res => {
        this.$alert(`验证码为${res.data.code}`)
      })
    },
    handleSubmit (id) { // 提交订单
      let result = this.cheackData()
      if (!result) {
        const data = {
          users: this.users,
          insurances: this.insurances,
          contactName: this.contactName,
          contactPhone: this.contactPhone,
          invoice: this.invoice,
          captcha: this.captcha,
          seat_xid: this.$route.query.seat_xid,
          air: +this.$route.query.id
        }
        this.setAirorders(data).then(res => {
          const { data } = res
          if (data.status !== 0) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.$router.push({ path: '/ticket/pay', query: { id: data.data.id } })
        })
      }
    },
    handleInsurance (index, id) { //保险多选数据处理
      if (this.insurances.indexOf(id) > -1) {
        this.insurances.splice(index, 1)
      } else {
        this.insurances = [...this.insurances, id]
      }
    },
    /* --------------------------据校验器-------------------------------- */
    cheackData () {
      for (let i = 0, l = this.users.length; i < l; i++) {
        if (!this.users[i].username) return this.$alert('乘车人姓名不能为空')
        if (!this.users[i].id) return this.$alert('乘车人身份证不能为空')
      }
      if (!this.contactName) return this.$alert('姓名不能为空')
      if (!this.contactPhone) return this.$alert('手机不能为空')
      if (!this.captcha) return this.$alert('验证码不能为空')
    }
  }
}
</script>
