"use strict"
const {merge} = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.js');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const path = require('path');
const glob = require('glob');
const PATHS = {
  src: path.join(__dirname, '../src')
}

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        exclude: /\/excludes/,
        cache: true, // 是否缓存
        parallel: true, // 是否并行打包
        sourceMap: true
      })
    ],
  },
  plugins: [
    // 去除多余或者重复的css
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
    }),
  ]
});
