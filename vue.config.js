const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        dayjs: 'dayjs'
      }),
      new webpack.ProvidePlugin({
        uuid: 'node-uuid'
      })
    ]
  }
}
