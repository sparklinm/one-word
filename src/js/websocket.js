const io = require('socket.io-client')
// 此时会触发后台的connect事件
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

export {
  sendChat,
  receiveChat,
  sendJoinRoom,
  receiveJoinRoom,
  receiveEnterRoom,
  removeAllListeners,
  sendGetMessages,
  receiveGetMessages
}
