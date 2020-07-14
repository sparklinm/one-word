const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        dayjs: 'dayjs'
      })
    ]
  }
}
