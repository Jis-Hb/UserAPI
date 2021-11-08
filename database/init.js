const Sequelize = require('sequelize')

const sequelize = new Sequelize('root', 'root', 'root', {
  host: '',
  dialect: 'mysql',
  port: '3306'
})
sequelize
  .authenticate()
  .then(() => {
    console.log('链接数据库成功')
  })
  .catch((err) => {
    console.error('链接失败' + '错误信息' + err)
  })

module.exports = { Sequelize, sequelize }
