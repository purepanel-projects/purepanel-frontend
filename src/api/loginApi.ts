import request from "@/api/request.ts";
import type Res from "@/types/Res.ts";

//获取验证码
export interface GetCaptchaRes {
    captchaKey: string
    captchaBase64: string
}
export function getCaptchaApi(): Promise<Res<GetCaptchaRes>> {
    return request.get('/login/getCaptcha')
}

//账号登录
export interface AccountLoginRes {
    key: string
    captchaBase64: string
}
export interface AccountLoginReq {
    account: string,
    pwd: string,
    captcha: string,
    captchaKey: string,
}
export function loginApi(req: AccountLoginReq): Promise<Res<AccountLoginRes>> {
    return request.post('/login/accountLogin', req)
}