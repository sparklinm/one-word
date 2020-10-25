import Mock from 'mockjs'
const Random = Mock.Random

const queryString = function (url) {
  const q = url.split('?')[1]
  const a = q.split('&')
  const o = {}

  for (let i = 0, len = a.length; i < len; i++) {
    const n = a[i].indexOf('=')

    if (n === -1) continue
    const v1 = a[i].substring(0, n)
    const v2 = a[i].substring(n + 1)

    o[v1] = unescape(v2)
  }
  return o
}

Mock.setup({
  timeout: 0
})

const heads = []

for (let i = 0; i < 6; i++) {
  heads.push(`/user/head${i}.jpg`)
}

const imgs = []

for (let i = 0; i < 6; i++) {
  imgs.push(`/card/img${i}.jpg`)
}

Mock.Random.extend({
  data: imgs,
  // ⾃定义占位符名字imgs
  imgs: function () {
  // 随机选择1-6个作为返回值
    return this.pick(this.data, 1, 6)
  }
})

const cards = Mock.mock({
  'cards|6': [
    {
      'id|+1': 0,
      nickName: '想不想喝奶茶',
      'head|1': heads,
      signature: '挖一个坑，种一棵树。吃一口饭，睡一天觉。',
      content: '@cparagraph(30, 50)',
      imgs: '@imgs',
      date: '2020-6-12 12:35:58.333',
      comments: [
        {
          id: 1,
          nickName: '酒中客',
          head: '/user/head1.jpg',
          content: '加油',
          date: '2020-6-11 12:35:58.333'
        },
        {
          id: 2,
          nickName: '飞扬的小明',
          head: '/user/head2.jpg',
          content: '明天一定会更好的',
          date: '2020-6-12 02:35:58.333'
        },
        {
          id: 3,
          nickName: '花落谁家',
          head: '/user/head3.jpg',
          content: '生气，就是拿别人的过错来惩罚自己。原谅别人，就是善待自己。',
          date: '2020-6-12 03:35:58.333'
        },
        {
          id: 4,
          nickName: '每天多吃一点',
          head: '/user/head4.jpg',
          content: '受思深处宜先退，得意浓时便可休。',
          date: '2020-6-02 03:35:58.333'
        },
        {
          id: 5,
          nickName: '好想睡觉a',
          head: '/user/head5.jpg',
          content:
        '有些事看似很小但回报最大，这些事要重复去做：比如每天运动半小时，每天看书写作半小时。',
          date: '2020-6-10 21:12:36.333'
        }
      ]
    }
  ]
})


Mock.mock('/data/card.json', 'get', cards)
