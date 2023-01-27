import { Badge, Tag } from 'antd'
import { blogStatusColor, blogStatusObject, blogTypeColor, blogTypeText } from '../../../../constant/blog'

export const ShowStatus = (status: 1 | 2 | 3) => (
    <Badge color={blogStatusColor[status]} text={blogStatusObject[status]} />
)

export const ShowType = (type: 1 | 2 | 3) => <Tag color={blogTypeColor[type]}>{blogTypeText[type]}</Tag>
