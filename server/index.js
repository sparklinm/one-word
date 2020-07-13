const io = require('socket.io')(3001)

// socket相关监听都要放在这个回调里
io.on('connection', function (socket) {
  socket.on('disconnect', function () {
  })

  socket.on('chart-message', function (obj) {
    obj.date = new Date().getTime()
    io.emit('chart-message', obj)
  })
})

