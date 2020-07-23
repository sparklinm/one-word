
const express = require('express')
const app = express()
const { chatBot } = require('./chat-bot')

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

const server = app.listen(3001)

module.exports = {
  server
}