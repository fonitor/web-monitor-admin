import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import routes from '@/router'
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', // api的base_url
  timeout: 5000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.method === 'post' && typeof config.data === 'string') {
    config.data = Qs.stringify(config.data)
  }
  // Do something before request is sent

  config.headers['Content-Type'] = 'application/json'
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  // config.headers['Content-Type'] = 'multipart/form-data'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    return Promise.resolve(res)
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service