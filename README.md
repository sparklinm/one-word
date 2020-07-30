# vue-one-word

## Project setup

```bash
# install dependencies
yarn install

# serve with hot reload
yarn serve

# run express
yarn start

# compiles and minifies for production
yarn build

# lints and fixes files
yarn lint
```

## Introduction

一个社交平台，用户可以在这里写下自己内心感想，并发布，也可加入到聊天房间和他人聊天，或是匹配陌生人聊天。

界面整体简洁，给人一种小清新的风格。

## Demo

[查看 demo 请点这里](https://one.word.sparklinm.cn)。

## Tech Stack

- Vue @ 2.6.10
- vue-router
- vuex
- vue-cli @ 4.x
- ES6
- stylus
- daysjs
- socket.io
- Element-ui
- Mock
- jsonwebtoken
- tencentcloud-sdk-nodejs
- babel
- pwa

## Features

- [x] 卡片列表
- [x] 文章列表
- [x] 文章详情
- [x] 写评论
- [x] 写卡片
- [x] 聊天机器人
- [x] 聊天匹配
- [x] 聊天房间
- [x] 页面切换动画
- [x] 移动、pc 自适应
- [x] 登录验证

## socket.io

这里使用到了 [socket.io](https://socket.io/) 来实现聊天功能，`socket.io` 是对 `websocket`, `ajax` 轮循等客户端和服务端双端通信的方式的封装。

`socket.io` 可以对连接的 `socket` 进行分组(通过房间)或是划分区域(通过 namespace)，这样就可给特定的人或组发送消息。

具体思路如下：

群聊时：通过分类的房间，将每一个 `socket` 放入到对应房间去。发送消息时，由房间所在命名空间发送消息给房间所有人。

私聊时：将两个人放入到同一个房间。再发送消息给房间里的两个人。

## 聊天机器人

聊天机器人是使用了腾讯聊天机器人，通过 express 后端来转发用户和聊天机器人之间的消息。后端部署在阿里云服务器上。

## 登录逻辑

### 前端

#### 登录

检查本地 token 是否存在

- 存在，请求用户信息
  用户信息接口验证 token
  - 合法
    返回用户信息
  - 不合法
    返回 401
- 不存在，调用登录接口
  登录成功返回 token，本地存储

#### 路由拦截

路由如果需要登录权限
获取本地存储的 token

- 如果 token 存在
  跳转路由
- 不存在
  弹出登录框（或提示前往登录页面），
  登录成功后，跳转路由

#### 请求拦截

获取保存的 token，如果 token 存在，请求附带 token

#### 响应拦截

- 响应成功（返回 200）
  如果返回信息中有 token，保存 token
- 响应失败
  如果状态码是否等于 401，提示登录过期，清除本地 token

### 服务端

#### 登录接口

登录接口登录成功时返回 token

#### 验证和刷新 token

在处理请求前拦截请求，**需要登录权限**的接口验证 token

- 验证成功
  - 如果 token 满足刷新条件，创建一个新 token
  - 处理请求成功，将新 token 一起返回
- 验证失败
  - 返回 401

## LICENSE

[MIT](https://github.com/sparklinm/one-word/blob/master/LICENSE)
