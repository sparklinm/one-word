
const express = require('express')
const app = express()
const { chatBot } = require('./chat-bot')


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