const uuid = require('node-uuid')

const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')

const io = require('socket.io')(3001)

const messages = {}
const rooms = {}

function validatorID (id) {
  if (id === 0 || id) {
    return true
  }

  return false
}

// socket相关监听都要放在这个回调里
io.on('connection', function (socket) {
  socket.on('disconnect', function () {})

  socket.on('chat', function (data) {
    const roomID = data.roomID

    if (!validatorID(roomID)) {
      return
    }

    const room = rooms[roomID]

    room.chat(data.user, data.content, data.id)

    // // 用socket.to不会发布给自己
    // io.to(roomID).emit('chart', data)
  })

  socket.on('get-messages', function (data) {
    const roomID = data.roomID

    if (!validatorID(roomID)) {
      return
    }

    const room = rooms[roomID]

    data.socket = socket

    room.getMessages(data)
  })

  socket.on('join', function (data) {
    const roomID = data.room && data.room.id
    const userID = data.user && data.user.id

    if (!validatorID(roomID) || !validatorID(userID)) {
      return
    }

    let room = rooms[roomID]

    if (!room) {
      room = rooms[roomID] = new Room(data.room, io)
    }

    room.join(socket, data.user)
  })
})


class Room {
  constructor (room, namespace) {
    Object.assign(this, room)
    this.namespace = namespace
  }

  userInRoom (user) {
    const member = this.members.find((m) => m.id === user.id)

    return Boolean(member)
  }

  userAllMessage (user) {
    let pushMessages = []

    for (let index = this.messages.length - 1; index > -1; index--) {
      const message = this.messages[index]

      if (
        message.type === 'system' &&
        message.action === 'join' &&
        message.user.id === user.id
      ) {
        pushMessages = this.messages.slice(index)
        break
      }
    }
    return pushMessages
  }

  join (socket, user) {
    if (this.userInRoom(user)) {

      const params = {
        user,
        action: 'enter',
        content: this.filterMessages({
          socket,
          user,
          to: new Date(),
          size: 5,
          direction: -1
        })
      }

      this.send({
        event: 'enter',
        message: this.systemMessage(params),
        store: false,
        id: socket.id
      })
    } else {
      socket.join(this.id)
      this.members.push(user)
      const params = {
        user,
        action: 'join'
      }

      this.send({
        event: 'join',
        message: this.systemMessage(params)
      })
    }
  }

  leave (socket, user) {
    socket.leave(this.id)
    const index = this.members.findIndex((m) => m.id === user.id)

    if (index === -1) {
      return
    }

    this.members.splice(index, 1)
    const params = {
      user,
      action: 'leave'
    }

    this.send({
      event: 'leave',
      message: this.systemMessage(params)
    })
  }

  chat (user, content, id) {
    if (!this.userInRoom(user)) {
      return
    }
    const message = this.userMessage(user, content, id)

    this.send({
      event: 'chat',
      message
    })
  }

  filterMessages (filters) {
    let { user, from, to, key, size, direction } = filters

    // const fromDate = from ? dayjs(0) : dayjs(from)
    // const toDate = to ? dayjs() : dayjs(to)

    // const filteredMessages = this.messages.filter(message => {
    //   if (message.type === 'user') {
    //     const timeMatch = dayjs(message.date).isBetween(fromDate, toDate)

    //     return timeMatch
    //   }
    // })

    const filteredMessages = []
    const allMessages = this.userAllMessage(user)

    if (direction === -1) {
      const toDate = dayjs(to)

      for (let index = allMessages.length - 1; index > -1; index--) {
        const message = allMessages[index]

        if (dayjs(message.date).isBefore(toDate)) {
          filteredMessages.unshift(message)
          --size
        }
        if (size <= 0) {
          break
        }
      }
    }

    return filteredMessages
  }

  getMessages (data) {
    const { socket, user } = data
    const filteredMessages = this.filterMessages(data)

    this.send({
      event: 'get-messages',
      message: this.systemMessage({
        action: 'get',
        content: filteredMessages,
        user
      }),
      store: false,
      id: socket.id
    })
  }

  systemMessage ({ action, user, content }) {
    return {
      id: uuid.v4(),
      roomID: this.id,
      nickName: 'system',
      head: '/user/head0.jpg',
      user,
      content,
      date: new Date().getTime(),
      type: 'system',
      // join, leave
      action
    }
  }

  userMessage (user, content, id) {
    return {
      id: id,
      roomID: this.id,
      userID: user.id,
      nickName: user.nickName,
      head: user.head,
      content: content,
      date: new Date().getTime(),
      type: 'user'
    }
  }

  send ({ event, message, store = true, id }) {
    if (store) {
      this.messages.push(message)
    }
    this.namespace.to(id || this.id).emit(event, message)
  }
}
