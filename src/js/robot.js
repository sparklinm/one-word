/**
 * 腾讯对话机器人
 */

import axios from 'axios'

function getRobotChat (content) {
  const params = {
    params: {
      content
    }
  }

  return axios.get('/api/chat-bot', params).then(res => {
    return res.data
  })
}

export { getRobotChat }
