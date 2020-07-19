const io = require('socket.io-client')
// 此时会触发后台的connect事件
// websocket 不会引起跨域
const socket = io('ws://127.0.0.1:3001') // 建立链接


function emit (event, data) {
  socket.emit(event, data)
}

function on (event, callback) {
  socket.on(event, function (data) {
    callback(data)
  })
}

function removeAllListeners () {
  socket.removeAllListeners()
}


function sendJoinRoom (data) {
  emit('join', data)
}

function receiveJoinRoom (callback) {
  on('join', callback)
}

function receiveEnterRoom (callback) {
  on('enter', callback)
}

function sendChat (data) {
  // 向服务器发送消息
  emit('chat', data)
}

function receiveChat (callback) {
  on('chat', callback)
}


function sendGetMessages (data) {
  emit('get-messages', data)
}

function receiveGetMessages (callback) {
  on('get-messages', callback)
}

function sendMatch (data) {
  emit('match', data)
}

function receiveMatch (callback) {
  removeAllListeners()
  on('match', callback)
}

function sendCancelMatch (data) {
  emit('cancel-match', data)
}

export {
  sendChat,
  receiveChat,
  sendJoinRoom,
  receiveJoinRoom,
  receiveEnterRoom,
  removeAllListeners,
  sendGetMessages,
  receiveGetMessages,
  sendMatch,
  receiveMatch,
  sendCancelMatch
}
