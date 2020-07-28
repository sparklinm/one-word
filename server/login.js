const express = require('express')
const router = express.Router()

const { generateToken, decodeToken, getToken } = require('./token')
const uuid = require('node-uuid')

const id = uuid.v4()

function getUser (id) {
  return {
    id,
    head: '/user/head0.jpg',
    sex: 'man',
    nickName: '飞翔的荷兰猪' + id.slice(0, 12),
    signature: '挖一个坑，种一棵树。吃一口饭，睡一天觉。'
  }
}

router.get('/user', (req, res) => {
  const id = decodeToken(getToken(req.get('Authorization'))).userID
  const user = getUser(id)

  res.status(200).send(user)
})

router.get('/login', (req, res) => {
  const data = req.query

  if (!data || !data.username || !data.password) {
    res.status(400).send('No username or password')
  }

  const id = uuid.v4()
  const user = getUser(id)

  user.token = generateToken({
    username: data.username,
    ...user
  })

  res.send(user)
})

module.exports = router