const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const main = require('./router/main')

require('./database/init')
require('./database/model/User')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length,Authorization,Accept,X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  else next()
})

app.get('/', (req, res) => {
  res.status(404).send({
    data: null,
    meta: {
      msg: 'Not Found',
      status: 404
    }
  })
})

app.use('/api', (req, res, next) => {
  if (req.url === '/login' || req.url === '/register') {
    next()
    return
  }
  const token = String(req.headers.authorization)
  // 解析 token 如果解析失败 返回的是null
  const username = jwt.decode(token, 'just')
  // 判断客户端是否传递了 token
  if (token === 'undefined' && username == null) {
    res.status(404).send({
      data: null,
      meta: {
        msg: 'token无效',
        status: 404
      }
    })
    return
  }

  // 直接放行
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', main)

app.listen('3001', () => {
  console.log('http://localhost:3001')
})
