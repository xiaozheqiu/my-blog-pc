import { DataTypes } from 'sequelize'
import sequelize from '../database'
const Console = require('Console')

const User = sequelize.define(
    'user', // 数据表表名
    {
        // id 会被sequelize自动创建,
        account: {
            type: DataTypes.STRING, // 字符串
            allowNull: false, // 不为空
            unique: true,
            comment: '用户名, 唯一' // 备注
        },
        password: {
            type: DataTypes.CHAR(64),
            allowNull: false,
            comment: '密码'
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0, // 默认值
            comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员'
        }
    },
    {
        // 不要忘记启用时间戳！
        timestamps: true
    }
)

// 将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
User.sync({ alter: true })
    .then(() => {
        Console.success('用户表已同步')
    })
    .catch((err) => Console.error('无法同步用户表', err))

export default User
