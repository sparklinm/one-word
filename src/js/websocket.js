const io = require('socket.io-client')
// 此时会触发后台的connect事件
const socket = io('ws://127.0.0.1:3001') // 建立链接

function sendChartMessage (data) {
  // 向服务器发送消息
  socket.emit('chart-message', data)
}

function receiveChartMessage (callback) {
  socket.on('chart-message', function (data) {
    callback(data)
  })
}


export {
  sendChartMessage,
  receiveChartMessage
}
