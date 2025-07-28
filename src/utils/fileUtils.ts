//根据文件相对路径获取文件网络地址
export function getFileNetworkPath(filePath: string) {
    return `${import.meta.env.VITE_BASE_API}/files/${filePath}`;
}