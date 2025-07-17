import type Res from "@/types/Res.ts";
import type {PageReq, PageRes} from "@/types/Page.ts";
import type {SysRole} from "@/types/SysRole.ts";
import request from "@/api/request.ts";

//角色列表分页查询
export interface RolePageListReq extends PageReq {
    name?: string,
}

export function rolePageListApi(req: RolePageListReq): Promise<Res<PageRes<SysRole>>> {
    return request.post('/sysRole/pageList', req)
}