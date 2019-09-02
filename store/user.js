export const state = () => ({
  userInfo: {
    token: ''
  }
})
export const mutations = () => ({
  setToken(state, token) {
    state.userInfo.token = token
  }
})
export const actions = () => ({
  setToken({ commit }, token) {
    commit('setToken', token)
  }
})
