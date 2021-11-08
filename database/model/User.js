const { Sequelize, sequelize } = require('../init.js')

const User = sequelize.define('myUser', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
// 同步类型
User.sync().then(() => {
  console.log('模型同步成功')
})

// 导出
module.exports = { User }
