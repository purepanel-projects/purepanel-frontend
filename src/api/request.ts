import axios from 'axios'
import type Res from "@/type/Res.ts";
import {MessagePlugin} from 'tdesign-vue-next';
import router from "@/router";

// 从 vite 环境变量中读取 baseURL
const baseURL = import.meta.env.VITE_API_BASE
// 创建 axios 实例
const request = axios.create({
    baseURL,
    timeout: 10000, // 可根据需要调整
})
//请求拦截器
request.interceptors.request.use(config => {
    const requestHeader = config.headers
    const loginInfoStr = localStorage.getItem("loginInfo")
    if (loginInfoStr) {
        const loginInfo = JSON.parse(loginInfoStr)
        requestHeader.set("Login-Code", loginInfo.loginCode)
    }
    return config
})

//定义响应状态码
const STATUS_CODE = {
    //成功
    SUCCESS: 200,
    //未授权（登录信息有误，需要重新登录）
    UNAUTHORIZED: 401,
    //无操作权限
    NO_PERMISSIONS: 403,
    //服务器错误
    FAIL: 500,
}
// 响应拦截器
request.interceptors.response.use(response => {
    //只取业务数据部分
    const res: Res<any> = response.data
    if (res.status === STATUS_CODE.UNAUTHORIZED) {
        MessagePlugin.error(res.msg)
        localStorage.removeItem("loginInfo")
        router.replace('/login')
    } else if (res.status === STATUS_CODE.FAIL) {
        MessagePlugin.error(res.msg)
        throw new Error(res.msg)
    }
    return response.data
}, error => {
    // 可统一处理 401/500 等错误
    return Promise.reject(error)
})

export default request
