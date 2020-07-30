const jwt = require('jsonwebtoken')
const secret = 'a secret key2'
const options = {
  expiresIn: 60 * 60,
  algorithm: 'HS256'
}


const generateToken = (user) => {
  const payload = {
    userID: user.id
  }
  const token = jwt.sign(payload, secret, options)

  return token
}


const decodeToken = (token) => {
  const decoded = jwt.decode(token)

  return decoded
}

const refreshToken = (token) => {
  const optionKeys = ['iat', 'exp', 'iss', 'sub']
  const playload = decodeToken(token)
  let newToken = ''
  const obj = {}
  // 剩余时间 30min
  const remainTime = 30 * 60
  const now = Math.floor(Date.now() / 1000)
  const timeToExpire = playload['exp'] - now

  if (timeToExpire < remainTime) {
    for (const key in playload) {
      if (optionKeys.indexOf(key) === -1) {
        obj[key] = playload[key]
      }
    }

    newToken = jwt.sign(obj, secret, options)
  }

  return newToken
}


const getToken = (Authorization) => {
  return Authorization.split(' ')[1]
}


module.exports = {
  refreshToken,
  generateToken,
  decodeToken,
  secret,
  getToken
}