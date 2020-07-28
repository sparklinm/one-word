import axios from 'axios'

export async function login (data, token) {
  // 如果本地存储有token，直接获取用户信息
  if (token) {
    const res = await axios.get('/user')

    return res
  }

  // 如果没有，调用登录接口
  const res = await axios.get('/login', {
    params: {
      username: data.username,
      password: data.password
    }
  })

  return res
}