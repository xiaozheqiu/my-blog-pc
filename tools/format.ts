// 格式化数据库空值参数
export function formatMySqlQuery(obj: any) {
    for (const key in obj) {
        if (obj[key] == '' || obj[key] === undefined || obj[key] === null) {
            delete obj[key]
        }
    }
    return obj
}
