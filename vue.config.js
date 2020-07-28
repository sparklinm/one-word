const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        dayjs: 'dayjs'
      }),
      new webpack.ProvidePlugin({
        uuid: 'node-uuid'
      })
    ]
  },
  chainWebpack: config => {
    // // 解决ie11兼容ES6
    // config.entry('main').add('babel-polyfill')
    // // 开启图片压缩
    // config.module.rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true
    //   })
    // 开启js、css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 1000, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }))
      config.optimization.minimize(true)
      config.plugin('terser').use(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true // 生产环境自动删除console
            },
            warnings: false
          },
          sourceMap: false,
          parallel: true // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
        })
      )
    }
  },

  devServer: {
    proxy: {
      '/api': {
        // target: 'http://47.93.15.195:3001', // 对应自己的接口
        target: 'http://127.0.0.1:3001', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  productionSourceMap: false,
  publicPath: './',
  pwa: {
    iconPaths: {
      favicon32: 'logo.png',
      favicon16: 'logo.png',
      appleTouchIcon: 'logo.png',
      maskIcon: 'logo.png',
      msTileImage: 'logo.png'
    },
    manifestOptions: {
      icons: [
        {
          src: './logo.png',
          type: 'image/png',
          sizes: '144x144 192x192 512x512'
        }
      ]
    },
    themeColor: '#f5f5dc',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    name: 'OneWord'
  }
}
