const { User } = require('../../database/model/User')

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = async (req, res) => {
  // 接收客户端传递过来的信息
  const { username, password } = req.body
  const mdPassword = bcrypt.hashSync(password, salt)
  // 根据客户端传过来的 用户名 查询数据中是否存在
  const model = await User.findOne({ where: { username } })
  // 判断
  console.log(model)
  if (model) {
    res.send({
      data: null,
      meta: {
        message: '用户名已存在',
        status: 400
      }
    })
    return
  }
  // 创建用户
  const createUser = await User.create({ username, password: mdPassword })

  res.status(201).send({
    data: {
      createUser
    },
    meta: {
      message: '创建成功',
      status: 201
    }
  })
}
