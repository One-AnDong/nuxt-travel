/* --------------------------状态模块-------------------------------- */
export const state = () => ({
  airsHistory: [],
  currentData: {
    info: {},
    options: {}
  }
})
/* ---------------------------getters模块--------------------------- */
export const getters = {
  filghtsData(state) {
    //返回最新
    return state.currentData
  }
}
/* --------------------------mutations模块--------------------------- */
export const mutations = {
  //保存查询记录
  SET_AIRSHISTORY(state, obj) {
    if (state.airsHistory.length === 0) {
      state.currentData = obj
      state.airsHistory.push(obj)
      return
    }
    for (let i = 0, l = state.airsHistory.length; i < l; i++) {
      let current = state.airsHistory[i]
      if (
        current.info.departCity === obj.info.departCity &&
        current.info.destCity === obj.info.destCity &&
        current.info.departDate === obj.info.departDate
      ) {
        state.currentData = state.airsHistory[i]
        return
      }
    }
    state.currentData = obj
    state.airsHistory.push(obj)
  },
  //设置filghts数据
  SET_FILGHTS(state, data) {
    state.filghtsData = data
  },
  SWITCH_DATA(state, index) {
    state.currentData = state.airsHistory.slice(index, index + 1)[0]
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
    // commit('SET_FILGHTS', data)
    commit('SET_AIRSHISTORY', data)
  }
}
