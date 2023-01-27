/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios, { AxiosError } from 'axios'
import QS from 'qs'
import { message } from 'antd'
import { RawAxiosRequestConfig } from 'axios'

message.config({ duration: 2, maxCount: 1 })

// 请求超时时间
axios.defaults.timeout = 10000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        return config
    },
    function (error) {
        throwErrorMassage(error, 'request_error')
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        throwErrorMassage(error, 'response_error')
        return Promise.reject(error)
    }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: RawAxiosRequestConfig) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params })
            .then((res) => resolve(res.data))
            .catch((error) => reject(error))
    })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: any) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, QS.stringify(params))
            .then((res) => resolve(res.data))
            .catch((error) => reject(error))
    })
}

// 抛出错误提示
export function throwErrorMassage(error: AxiosError, type: string) {
    console.log(error, 'error', type)
    const { response, code, message: axiosErrorMsg } = error
    // @ts-ignore  // 这个是真二比，不加注释就ts就报错
    const errorCode = response?.data?.code || code
    // @ts-ignore
    const errMsg = response?.data?.message || axiosErrorMsg
    message.error(`code: ${errorCode} message: ${errMsg}`).then(() => {})
}
