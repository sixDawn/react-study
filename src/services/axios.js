/**
 * request.js
 */
import axios from 'axios'
import qs from 'qs'

const service = axios.create({
  baseURL: '',
  timeout: 5000,
  responseType: 'json',
  withCredentials: true, //cookie
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',  // application/x-www-form-urlencoded  application/json;charset=utf-8
    'Access-Token': 'usertoken'
  }
})

// service.defaults.baseURL = '' //默认域名

service.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
    response => {
      if (response.status === 200) {
        let data = response.data || JSON.parse(response.request.responseText)
        let stateCode = data.status || data.code
        let res
        switch (stateCode) {
          case 200: // 成功状态时，直接将数据返回
            res = data
            return data;
          case 1: // 成功状态时，直接将数据返回
            res = data
            return data;
          case 2001:
            break
          case 401:
            break
          case 0:
            break
          default:
            res = data
        }
        res = data
        return Promise.reject(res)
      } else {
        return Promise.reject(response)
      }
    },
    error => {
      if (!error.response) {
        return Promise.reject(error);
      }
      if (error.response.status) {
        switch (error.response.status) {
          case 500:
            console.log('服务器修复中...')
            break;
          case 401:
            // 清除用户相关信息，跳转到登录页面
            break;
          case 403:
            console.log('登录过期，请重新登录')
            // 清除用户相关信息，跳转到登录页面
            break;
          // 404请求不存在
          case 404:
            console.log('网络请求不存在')
            break;
          // 其他错误，直接抛出错误提示
          default:
            console.log(error.response.data.message)
        }
        return Promise.reject(error.response);
      }
    }
)

export default service
