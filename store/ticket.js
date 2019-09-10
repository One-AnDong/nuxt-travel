/* --------------------------状态模块-------------------------------- */
export const state = () => ({
  //查询机票历史
  airsHistory: [],
  //当前机票数据
  currentData: {
    info: {},
    options: {}
  },
  //机票总价
  airsPrice: 0,
  userCount: 1,
  //机票数据
  airsInfo: {
    insurances: [],
    seat_infos: []
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
  // 切换数据
  SWITCH_DATA(state, index) {
    state.currentData = state.airsHistory.slice(index, index + 1)[0]
  },
  //设置机票价格
  SET_AIRSPRICE(state, val) {
    state.airsPrice = val
  },
  //设置机票信息
  SET_AIRSINFO(state, obj) {
    state.airsInfo = obj
  },
  SET_COUNT(state, val) {
    state.count = val
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
    commit('SET_AIRSHISTORY', data)
  },
  //提交订单
  async setAirorders({ rootState }, data) {
    let res = this.$axios({
      url: '/airorders',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${rootState.user.token}`
      },
      data
    })
    return res
  },
  // 获取机票数据
  async getAirsData({ commit }, params) {
    let res = await this.$axios({
      url: `/airs/${params.id}`,
      params
    })
    console.log(res.data)
    commit('SET_AIRSINFO', res.data)
  },
  //获取订单详情
  async getAirorders({ rootState }, id) {
    let res = await this.$axios({
      url: `/airorders/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${rootState.user.token}`
      }
    })
    console.log(res)
    return res
  },
  //查询付款状态
  async getPayStatus({ rootState }, data) {
    let res = await this.$axios({
      url: '/airorders/checkpay',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${rootState.user.token}`
      },
      data
    })
    return res
  }
}
