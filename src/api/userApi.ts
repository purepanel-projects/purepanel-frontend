import request from "@/api/request.ts";
import type Res from "@/type/Res.ts";

//修改密码
export interface ChangePwdReq {
    oldPwd?: string,
    newPwd: string,
    userId?: string,
}

export function changeSelfPwdApi(req: ChangePwdReq): Promise<Res<any>> {
    return request.post('/sysUser/changeSelfPwd', req)
}

export function changePwdApi(req: ChangePwdReq): Promise<Res<any>> {
    return request.post('/sysUser/changePwd', req)
}