"use strict"
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV === 'production'
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const path = require('path')
module.exports = {
  entry: ["react-hot-loader/patch", "./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[hash].js',
  },
  externals: {
    React: 'React',
    'React-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      minify: {
        removeComments: devMode ? true : false,
        collapseWhitespace: devMode ? true : false,
        removeAttributeQuotes: devMode ? true : false
      }
    }),
    new CleanWebpackPlugin(),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
  ],
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
            name: '[name].[ext]',
            limit: 2048 //如果图片大小大于2048【2kb】字节的话，那就像file-loader下被打包到dist/images下，//否则会被打包成Base64的字符串放在bundle.js下
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}