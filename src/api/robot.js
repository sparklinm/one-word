/**
 * 腾讯对话机器人
 */

import axios from 'axios'

async function chatRobot (content) {
  const params = {
    params: {
      content
    }
  }

  const res = await axios.get('/chat-bot', params)

  return res.data
}

export { chatRobot }
