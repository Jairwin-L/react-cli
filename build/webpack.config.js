"use strict"
/* 
  英文官网：https://webpack.js.org/
  其他中文网：https://webpack.docschina.org/
*/
const webpack = require('webpack');
// html-webpack-plugin：https://www.webpackjs.com/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin：https://github.com/johnagan/clean-webpack-plugin
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV === 'production'
const path = require('path')
const resolvePath = dir => path.join(__dirname, '..', dir)
module.exports = {
  /* 
  第一项：
  react-hot-loader：https://github.com/gaearon/react-hot-loader
  开发模式的时候，会搭配热更新一起来使用。但是webpack-dev-server的hot，在更新时，会刷新整个页面。在react开发时，刷新了页面，会丢失以前的数据流，需要我们重新再去操作。这样很麻烦。所以需要一个新的插件，react-hot-loader，react-hot-loader不会刷新整个页面，它只是替换了修改的代码，做到了页面的局部刷新。
  */
  // 第二项（入口文件）：https://webpack.docschina.org/concepts/#%E5%85%A5%E5%8F%A3entry
  entry: {
    'app': [
      'react-hot-loader/patch',
      resolvePath('src/index.jsx')
    ]
  },
  // entry: ["react-hot-loader/patch", resolve('src/index.jsx')],
  /* 
  https://webpack.docschina.org/concepts/#%E8%BE%93%E5%87%BAoutput
  在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中
  */
  output: {
    path: resolvePath('dist'),
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
        removeComments: devMode, // 移除HTML中的注释
        collapseWhitespace: devMode, // 删除空白符与换行符
        removeAttributeQuotes: devMode, //删除双引号
        minifyCSS: devMode, // 压缩内联css
      }
    }),
    new CleanWebpackPlugin(),
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
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              // modifyVars: {
              //   '@primary_btn': '#1890ff',
              //   '@detail_btn': '#2db7f5',
              //   '@edit_btn': '#8354ee',
              //   '@delete_btn': '#ff4d4f',
              //   '@white': '#fff',
              //   '@black': '#333',
              // },
              javascriptEnabled: true
            },
          },
        }]
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
    extensions: ['.js', '.jsx', '.json', '.less'],
    // 路径别名
    alias: {
      '@components': resolvePath('src/components'),
      '@api': resolvePath('src/api'),
      '@img': resolvePath('src/assets/img'),
      '@less': resolvePath('src/assets/css'),
      '@media': resolvePath('static/media'),
    }
  },
}