export const state = () => ({
  token: '',
  userInfo: {}
})
export const getters = () => ({
  doneToken(state) {
    return 'Bearer' + state.token
  },
  doneUserInfo(state) {
    return state.userInfo
  }
})
export const mutations = () => ({
  setToken(state, token) {
    state.token = token
  },
  setUserInfo(state, data) {
    state.userInfo = data
  }
})
export const actions = () => ({
  //请求设置token
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  //请求设置用户信息
  setUserInfo({ commit }, data) {
    commit('setUserInfo', data)
  }
})
