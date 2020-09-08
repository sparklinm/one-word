const express = require('express')
const loginRouter = require('./login')
const chatbotRouter = require('./chat-bot')
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')
const expressJWT = require('express-jwt')
const { secret, refreshToken, getToken } = require('./token')

const app = express()


const options = {
  key: fs.readFileSync(
    path.join(__dirname, './nginx/2_back.end.sparklinm.cn.key'),
    'utf-8'
  ),
  cert: fs.readFileSync(
    path.join(__dirname, './nginx/1_back.end.sparklinm.cn_bundle.crt'),
    'utf-8'
  )
}
const httpServer = http.createServer(app)
const httpsServer = https.createServer(options, app)

const PORT = 3001
const SSLPORT = 3002

httpServer.listen(PORT)
httpsServer.listen(SSLPORT)

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.get('/test', (req, res) => {
  res.send('hello world')
})


// 请求前先验证token
app.use(
  expressJWT({
    secret: secret,
    algorithms: ['HS256']
  }).unless({
    // login路径不验证
    path: ['/login']
  })
)

// 错误处理
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err)
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).send(err)
  } else {
    next()
  }
})

// 刷新token
app.use(function (req, res, next) {
  const authorization = req.get('Authorization')

  if (authorization) {
    const token = getToken(authorization)
    const newToken = refreshToken(token)

    if (newToken) {
    // 放入到返回头中
      res.set('authorization', 'Bearer ' + newToken)
    }
  }

  next()
})

app.use('', loginRouter)
app.use('', chatbotRouter)

module.exports = {
  httpServer,
  httpsServer
}
