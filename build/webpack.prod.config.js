"use strict"
const {merge} = require('webpack-merge');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.common.config.js');

module.exports = merge(baseConfig, {
  // 设置为生产模式
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        exclude: /\/excludes/,
        parallel: true,
        sourceMap:true
      }),
    ],
  },
});
