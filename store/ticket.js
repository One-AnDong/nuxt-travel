/* --------------------------状态模块-------------------------------- */
export const state = () => ({
  airsHistory: [],
  filghtsData: {}
})
/* ---------------------------getters模块--------------------------- */
export const getters = {
  doneAirs(state) {
    //返回最新
    return state.airsHistory.slice(-1)[0]
  }
}
/* --------------------------mutations模块--------------------------- */
export const mutations = {
  //保存查询记录
  SET_AIRSHISTORY(state, obj) {
    state.airsHistory.push(obj)
  },
  //设置filghts数据
  SET_FILGHTS(state, data) {
    state.filghtsData = data
  }
}
/* --------------------------actions模块------------------------------ */
export const actions = {
  //获取机票
  async getAirs({ commit }, params) {
    let res = await this.$axios({
      url: '/airs',
      method: 'GET',
      params
    })
    const { data } = res
    commit('SET_FILGHTS', data)
  }
}
