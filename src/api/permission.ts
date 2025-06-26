import request from "@/api/request.ts";
import type Res from "@/type/Res.ts";
import type GetUserPermissionRes from "@/type/GetUserPermissionRes.ts";


export function getLoginUserPermissionApi(): Promise<Res<GetUserPermissionRes>> {
    return request.get('/sysPermission/getLoginUserPermission')
}