import { Message } from 'element-ui'

export default ({ $axios }) => {
  $axios.onRequest(config => {
    //config.headers['Authorization'] = localStorage.MANAGE_TOKEN
    // console.log(config)
  })
  $axios.onError(err => {
    const { statusCode, message } = err.response.data
    if (statusCode === 400) {
      Message.error(message)
    }
  })
}
