const { User } = require('../../database/model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = async (req, res) => {
  //接收客户端传递过来的账号和密码
  const { username, password } = req.body

  // 根据用户名查询数据库是否存在
  const findUser = await User.findOne({ where: { username } })
  // 判断如果不存在
  if (!findUser) {
    res.send({
      data: null,
      meta: {
        msg: '用户名不存在',
        status: 423
      }
    })
    return
  }
  const mdPassword = bcrypt.compareSync(password, findUser.password)

  // 判断账号和密码 是否正确
  if (username !== findUser.username || !mdPassword) {
    res.send({
      data: null,
      meta: {
        msg: '账户或者密码不正确',
        status: 423
      }
    })
    return
  }
  // 登入成功创建token 返回给客户端
  const token = jwt.sign({ username }, 'just')
  res.status(201).send({
    data: {
      username: username,
      token
    },
    meta: {
      msg: '登入成功',
      status: 201
    }
  })
}
