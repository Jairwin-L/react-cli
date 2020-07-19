"use strict"
/* 
  英文官网：https://webpack.js.org/
  以下注释的link使用（中文印记）或Github：https://webpack.docschina.org/
*/
const webpack = require('webpack');
// html-webpack-plugin：https://www.webpackjs.com/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin：https://github.com/johnagan/clean-webpack-plugin
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// happypack：https://github.com/amireh/happypack（将文件解析任务分解成多个子进程并发执行。子进程处理完任务后再将结果发送给主进程）
const HappyPack = require('happypack');
// Node的OS模块
const os = require('os');
// 代表共享进程池，即多个HappyPack实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const devMode = process.env.NODE_ENV === 'production'
const path = require('path')
const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  /* 
  第一项：
  react-hot-loader：https://github.com/gaearon/react-hot-loader
  开发模式的时候，会搭配热更新一起来使用。但是webpack-dev-server的hot，在更新时，会刷新整个页面。在react开发时，刷新了页面，会丢失以前的数据流，需要我们重新再去操作。这样很麻烦。所以需要一个新的插件，react-hot-loader，react-hot-loader不会刷新整个页面，它只是替换了修改的代码，做到了页面的局部刷新。
  */
  // 第二项（入口文件）：https://webpack.docschina.org/concepts/#%E5%85%A5%E5%8F%A3entry
  entry: ["react-hot-loader/patch", resolve('src/index.jsx')],
  /* 
  https://webpack.docschina.org/concepts/#%E8%BE%93%E5%87%BAoutput
  在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中
  */
  output: {
    path: resolve('dist'),
    filename: '[hash].js',
  },
  /* 
  外部扩展：https://webpack.docschina.org/configuration/externals/
  可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问（此教程使用了静态资源托管库）
  */
  externals: {
    React: 'React',
    'React-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      minify: {
        removeComments: devMode ? true : false, // 移除HTML中的注释
        collapseWhitespace: devMode ? true : false, // 删除空白符与换行符
        removeAttributeQuotes: devMode ? true : false,
        minifyCSS: devMode ? true : false, // 压缩内联css
      }
    }),
    new CleanWebpackPlugin(),
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'happyBabel',
      // 用法和 webpack Loader 配置中一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      // 是否允许 HappyPack 输出日志，默认是 true
      verbose: true,
    }),
  ],
  /* 
  https://webpack.docschina.org/configuration/module/
  */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // use: 'babel-loader',
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|bmp|eot|woff|woff2|ttf|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            limit: 2048 // 如果图片大小大于2048【2kb】字节的话，那就像file-loader下被打包到dist/images下，//否则会被打包成Base64的字符串放在bundle.js下
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:8].[ext]',
            limit: 10240
          }
        }
      },
    ],
  },
  /* 
  https://www.webpackjs.com/configuration/resolve/
  */
  resolve: {
    // 自动解析确定的扩展，可以在引入模块时不带扩展
    extensions: ['.js', '.jsx', '.json'],
    // 路径别名
    alias: {
      '@components': resolve('src/components'),
      '@api': resolve('src/api'),
      '@img': resolve('src/assets/img'),
      '@css': resolve('src/assets/css'),
      '@media': resolve('static/media'),
    }
  },
}