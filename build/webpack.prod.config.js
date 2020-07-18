"use strict"
const {merge} = require('webpack-merge');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.config.js');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const path = require('path')
const glob = require('glob')
const PATHS = {
  src: path.join(__dirname, '../src')
}

module.exports = merge(baseConfig, {
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
  plugins: [
    // 去除多余或者重复的css
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
  ]
});
