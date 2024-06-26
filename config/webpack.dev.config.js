'use strict';
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  // 设置为开发模式
  mode: 'development',
  devtool: 'inline-source-map',
  // 配置服务端目录和端口
  devServer: {
    port: 8088,
    // open: true,
    compress: true,
    historyApiFallback: true,
    // TODO:
    // hot: true,
    // inline: true,
    // 选项让你更精确地控制bundle信息该怎么显示
    // stats: {
    //   colors: true,
    //   modules: false,
    //   children: false,
    //   chunks: false,
    //   chunkModules: false,
    //   entrypoints: false,
    //   assets: false
    // }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
