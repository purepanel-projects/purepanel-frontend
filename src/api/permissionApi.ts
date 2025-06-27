import {
    type GetLoginUserPermissionRes,
    type SysPermission,
    type SysPermissionTreeListRes
} from "@/type/PermissionRes.ts";
import request from "@/api/request.ts";
import type Res from "@/type/Res.ts";

export function addOrUpdateApi(data: SysPermission): Promise<Res<any>> {
    return request.post('/sysPermission/addOrUpdate', data)
}

export function allTreeListApi(): Promise<Res<SysPermissionTreeListRes[]>> {
    return request.get('/sysPermission/allTreeList')
}

export function getLoginUserPermissionApi(): Promise<Res<GetLoginUserPermissionRes>> {
    return request.get('/sysPermission/getLoginUserPermission')
}