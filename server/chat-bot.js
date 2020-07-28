/**
 * 腾讯对话机器人
 */
const tencentcloud = require('tencentcloud-sdk-nodejs')

const NlpClient = tencentcloud.nlp.v20190408.Client
const models = tencentcloud.nlp.v20190408.Models

const Credential = tencentcloud.common.Credential
const ClientProfile = tencentcloud.common.ClientProfile
const HttpProfile = tencentcloud.common.HttpProfile

const cred = new Credential('AKIDVftsbRFDMG8uRofTwBGNODl5A0czl9uP', '')
const httpProfile = new HttpProfile()

httpProfile.endpoint = 'nlp.tencentcloudapi.com'
const clientProfile = new ClientProfile()

clientProfile.httpProfile = httpProfile
const client = new NlpClient(cred, 'ap-guangzhou', clientProfile)

const req = new models.ChatBotRequest()

const express = require('express')

const router = express.Router()

function chatBot (content) {
  return new Promise((resolve, reject) => {
    const params = {
      Query: content
    }

    req.from_json_string(JSON.stringify(params))


    client.ChatBot(req, function (errMsg, response) {

      if (errMsg) {
        reject(errMsg)
        return
      }

      resolve(response.to_json_string())
    })
  })
}


router.get('/chat-bot', (req, res) => {
  const query = req.query

  chatBot(query.content).then((message) => {
    res.send(message)
  })
})

module.exports = router
