"use strict"
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}