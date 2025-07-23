import type Res from "@/types/Res.ts";
import type {PageReq, PageRes} from "@/types/Page.ts";
import type {SysRole} from "@/types/SysRole.ts";
import request from "@/api/request.ts";

//角色列表分页查询
export interface RolePageListReq extends PageReq {
    name?: string,
}

export function rolePageListApi(req?: RolePageListReq): Promise<Res<PageRes<SysRole>>> {
    return request.post('/sysRole/pageList', req)
}

//保存
export function roleSaveApi(req: SysRole): Promise<Res<any>> {
    return request.post('/sysRole/save', req)
}
//删除
export function roleDeleteApi(id: string): Promise<Res<any>> {
    return request.delete(`/sysRole/delete/${id}`)
}