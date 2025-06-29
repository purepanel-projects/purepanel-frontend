export interface GetLoginUserPermissionRes {
    menuTree: SysPermissionTreeListRes[];
    btnList: SysPermission[];
}

export interface SysPermissionTreeListRes extends SysPermission {
    children: SysPermissionTreeListRes[];
}

export interface SysPermission {
    id?: string;
    pid?: string;
    type?: number;
    path?: string;
    title?: string;
    icon?: string;
    orderNo?: number;
    isHidden?: boolean;
    expanded?: boolean;
    menuLevel?: number;
    authCode?: string;
}