import request from "@/api/request.ts";
import type Res from "@/type/Res.ts";

export interface GetCaptchaRes {
    key: string
    captchaBase64: string
}

export function getCaptcha(): Promise<Res<GetCaptchaRes>> {
    return request.get('/login/getCaptcha')
}