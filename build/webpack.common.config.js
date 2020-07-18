"use strict"
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const path = require('path')
const srcDir = path.join(__dirname, "../src");
console.log(path.join(__dirname, "../src/index.jsx"));
// console.log(`${srcDir}/index.html`);
// console.log(path.resolve(__dirname, 'public/index.html'));
// console.log(__dirname + '/src');
console.log(path.resolve(__dirname, '../dist'));
module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      // filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        exclude: /\/excludes/,
        parallel: true,
      }),
    ],
  },
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
        // include: /antd/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|bmp|eot|woff|woff2|ttf|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            //placeholder 占位符
            name: '[name].[ext]',
            limit: 2048 //如果图片大小大于2048【2kb】字节的话，那就像file-loader下被打包到dist/images下，//否则会被打包成Base64的字符串放在bundle.js下
          }
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}