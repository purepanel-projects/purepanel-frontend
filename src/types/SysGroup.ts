export interface SysGroupTreeListRes extends SysGroup {
    children: SysGroupTreeListRes[];
}

export interface SysGroup {
    id?: string;
    pId: string;
    name?: string;
    orderNo: number;
}