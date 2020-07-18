const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common.config.js');

module.exports = merge(baseConfig, {
	// 设置为开发模式
    mode: 'development',
    devtool: 'inline-source-map',
    // 配置服务端目录和端口
    devServer: {
      port: 8088,
      compress: true,
      hot: true,
      inline: true
    }
});
