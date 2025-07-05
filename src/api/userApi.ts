import request from "@/api/request.ts";
import type Res from "@/types/Res.ts";
import type {PageReq, PageRes} from "@/types/Page.ts";
import type {SysUser} from "@/types/SysUser.ts";

//用户列表分页查询
export interface UserPageListReq extends PageReq {
    name?: string,
    account?: string,
}

export function userPageListApi(req: UserPageListReq): Promise<Res<PageRes<SysUser>>> {
    return request.post('/sysUser/pageList', req)
}

//新增或更新用户
export function addOrUpdateUserApi(sysUser: SysUser): Promise<Res<any>> {
    return request.post('/sysUser/addOrUpdate', sysUser)
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