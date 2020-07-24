
const express = require('express')
const app = express()
const { chatBot } = require('./chat-bot')
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')


const options = {
  key: fs.readFileSync(path.join(__dirname, './nginx/2_back.end.sparklinm.cn.key'), 'utf-8'),
  cert: fs.readFileSync(path.join(__dirname, './nginx/1_back.end.sparklinm.cn_bundle.crt'), 'utf-8')
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
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})


app.get('/test', (req, res) => {
  res.send('hello world')
})

app.get('/chat-bot', (req, res) => {
  const query = req.query

  chatBot(query.content).then((message) => {
    res.send(message)
  })
})

module.exports = {
  httpServer,
  httpsServer
}