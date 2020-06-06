// 封装 axios 的请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'
import config from '@/config'
import errorHandle from './errorHandle'
import instance from './axios'

class HttpRequest {
    constructor(baseURL) {
        this.baseURL = baseURL
    }
    // 获取 axios 配置
    getInsideConfig () {
        const config = {
            baseURL: this.baseURL,
            headers: { 'Content-Type': 'application/json;chartset=uft-8' },
            timeout: 10000
        }
        return config
    }
    // 设定拦截器
    interceptors (instance) {
        // Add a request interceptor 请求拦截器
        instance.interceptors.request.use((config) => {
            // Do something before request is sent
            console.log('config', config);
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
            console.log('res is :', res);
            if (res.status === 200) {
                return Promise.resolve(res.data)
            } else {
                return Promise.reject(res)
            }
        }, (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            // debugger
            errorHandle(error)
            return Promise.reject(error);
        });
    }
    // 创建实例
    request (options) {
        const instance = axios.create()
        const newOptions = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance)
        return instance(newOptions)
    }
    // get 请求
    get (url, config) {
        const options = Object.assign({
            method: 'get',
            url: url
        }, config)
        return this.request(options)
    }
    // post 请求
    post (url, data) {
        return this.request({
            method: 'post',
            url: url,
            data: data
        })
    }
}

export default HttpRequest