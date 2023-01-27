import { DataTypes } from 'sequelize'
import sequelize from '../database'
const Console = require('Console')

const Blog = sequelize.define(
    'blog', // 数据表表名
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING, // 字符串
            comment: '博客标题' // 备注
        },
        releaseTime: {
            type: DataTypes.DATE,
            comment: '发布时间'
        },
        status: {
            type: DataTypes.INTEGER,
            comment: '文章状态: 0=未发布，1=已发布，2=已保存未发布'
        },
        type: {
            type: DataTypes.INTEGER,
            comment: '文章类别: 0=技术，1=随想，3=生活'
        },
        content: {
            type: DataTypes.TEXT('long'),
            comment: '文章正文'
        }
    },
    {
        // 不要忘记启用时间戳！
        timestamps: true
    }
)

// 将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
Blog.sync({ alter: true })
    .then(() => {
        Console.success('用户表已同步')
    })
    .catch((err) => Console.error('无法同步用户表', err))

export default Blog
