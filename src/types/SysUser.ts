export interface SysUser {
    id?: string;
    name?: string;
    account?: string;
    pwd?: string;
    salt?: string;
    avatar?: string;
    status?: boolean;
    email?: string;
    phoneNumber?: string;
}

export interface UserPageListRes extends SysUser {
    groupList?: {
        name: string;
        groupId: string;
    }[];
    roleList?: {
        name: string;
        roleId: string;
    }[];
    groupNames?:string;
    roleNames?:string;
}

export interface AddSysUserFormData extends SysUser {
    confirmPwd?: string;
}