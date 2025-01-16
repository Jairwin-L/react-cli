import webpack from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.mjs';

const devConfig = merge(baseConfig, {
  // 设置为开发模式
  mode: 'development',
  devtool: 'inline-source-map',
  // 配置服务端目录和端口
  devServer: {
    port: 8088,
    compress: true,
    historyApiFallback: true,
    allowedHosts: ['localhost'],
    client: {
      overlay: true,
      logging: 'info',
      progress: true,
      reconnect: true,
    },
    // TODO:
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

export default devConfig;
