import type Res from "@/types/Res.ts";
import type {SysGroupTreeListRes} from "@/types/SysGroup.ts";
import request from "@/api/request.ts";

//获取列表
export function groupAllTreeListApi(params?: any): Promise<Res<SysGroupTreeListRes[]>> {
    return request.get('/sysGroup/allTreeList', {params})
}