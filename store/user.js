import { Message } from 'element-ui'
export const state = () => ({
  token: '',
  userInfo: {}
})
export const getters = {
  doneToken(state) {
    return 'Bearer' + state.token
  },
  doneUserInfo(state) {
    return state.userInfo
  }
}
export const mutations = {
  //设置token
  SET_TOKEN(state, token) {
    state.token = token
  },
  //清除用户信息
  CLEARN_USERINFO(state) {
    state.token = ''
    state.userInfo = ''
  },
  //设置用户信息
  SET_USERINFO(state, data) {
    state.userInfo = data
  }
}
export const actions = {
  //请求设置token
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  //请求设置用户信息
  setUserInfo({ commit }, data) {
    commit('SET_USERINFO', data)
  },
  //登陆请求
  async userLogin({ commit }, data) {
    let res = await this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    })
    commit('SET_TOKEN', res.data.token)
    commit('SET_USERINFO', res.data.user)
    Message.success('登陆成功，正在跳转中')
    this.$router.push({ name: 'index' })
  }
}
