'use strict';
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.js');
// const PurgecssPlugin = require('purgecss-webpack-plugin');
// const glob = require('glob');
// const path = require('path');

// const PATHS = {
//   src: path.join(__dirname, '../src'),
// };

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        test: /\.ts?x(\?.*)?$/i,
        exclude: /\/excludes/,
        parallel: true, // 是否并行打包
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    /* 
			https://purgecss.com/plugins/webpack.html
			通过分析项目源代码和模板文件，识别并移除未使用的 CSS 类选择器，从而实现 CSS 文件的瘦身，提高网站性能
			*/
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    // }),
  ],
});
