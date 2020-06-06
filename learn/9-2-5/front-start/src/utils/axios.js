// 封装 axios 的请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'
import errorHandle from './errorHandle'

const instance = axios.create()
// Add a request interceptor 请求拦截器
instance.interceptors.request.use((config) => {
    // Do something before request is sent
    console.log('config' + config);
    return config;
}, (error) => {
    // Do something with request error
    errorHandle(err)
    return Promise.reject(error);
});

// Add a response interceptor 响应请求的拦截器
instance.interceptors.response.use((res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('res is :' + res);
    if (res.status === 200) {
        return Promise.resolve(res.data)
    } else {
        return Promise.reject(res)
    }
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    debugger
    errorHandle(err)
    return Promise.reject(error);
});
export default instance