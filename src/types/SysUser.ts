export interface SysUser {
    id?: string;
    name?: string;
    account?: string;
    pwd?: string;
    salt?: string;
    avatar?: string;
    status?: number;
    email?: string;
    phoneNumber?: string;
}

export interface AddSysUserFormData extends SysUser {
    confirmPwd?: string;
}