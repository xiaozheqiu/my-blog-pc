import { Sequelize } from 'sequelize'
import config from './config'
const Console = require('Console')

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = config

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    port: MYSQL_PORT,
    timezone: '+08:00',
    logging: (msg) => Console.debug(msg)
})

sequelize
    .authenticate()
    .then(() => Console.success('已成功建立连接.'))
    .catch((error) => Console.error('无法连接到数据库:', error))

export default sequelize
