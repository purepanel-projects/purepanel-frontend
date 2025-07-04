import request from "@/api/request.ts";
import type Res from "@/type/Res.ts";
import type {PageReq, PageRes} from "@/type/Page.ts";
import type {SysUser} from "@/type/SysUser.ts";

//用户列表分页查询
export interface UserPageListReq extends PageReq {
    name?: string,
    account?: string,
}

export function userPageListApi(req: UserPageListReq): Promise<Res<PageRes<SysUser>>> {
    return request.post('/sysUser/pageList', req)
}

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