import { Message } from 'element-ui'

export default ({ $axios, store, redirect }) => {
  //请求拦截
  $axios.onRequest(config => {
    // if (store.state.user.token) {
    //   config.headers['Authorization'] = `Bearer [${store.state.user.token}]`
    // }
  })
  //错误响应拦截
  $axios.onError(err => {
    const { statusCode, message } = err.response.data
    if (statusCode === 400) {
      Message.error(message)
    }
    if (statusCode === 401 || statusCode === 403) {
      Message.error('您还未登陆，请登录后操作')
      redirect({ path: '/user/login' })
    }
  })
}
