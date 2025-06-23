import axios from 'axios'

// 从 vite 环境变量中读取 baseURL
const baseURL = import.meta.env.VITE_API_BASE

const request = axios.create({
    baseURL,
    timeout: 10000, // 可根据需要调整
})

// 响应拦截器
request.interceptors.response.use(response => {
    //只取业务数据部分
    return response.data
}, error => {
    // 可统一处理 401/500 等错误
    return Promise.reject(error)
})

export default request
