"use strict"
/* 
  英文官网：https://webpack.js.org/
  其他中文网：https://webpack.docschina.org/
*/
const webpack = require('webpack');
// html-webpack-plugin：https://www.webpackjs.com/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin：https://github.com/johnagan/clean-webpack-plugin
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const devMode = process.env.NODE_ENV === 'production'
const path = require('path')
const resolvePath = dir => path.join(__dirname, '..', dir)
module.exports = {
  /* 
  第一项：
  react-hot-loader：https://github.com/gaearon/react-hot-loader
  开发模式的时候，会搭配热更新一起来使用。但是webpack-dev-server的hot，在更新时，会刷新整个页面。在react开发时，刷新了页面，会丢失以前的数据流，需要我们重新再去操作。这样很麻烦。所以需要一个新的插件，react-hot-loader，react-hot-loader不会刷新整个页面，它只是替换了修改的代码，做到了页面的局部刷新。
  */
  // 第二项（入口文件）：https://webpack.docschina.org/concepts/#%E5%85%A5%E5%8F%A3entry
  entry: {
    'app': [
      'react-hot-loader/patch',
      resolvePath('src/index.tsx')
    ]
  },
  // entry: ["react-hot-loader/patch", resolve('src/index.jsx')],
  /* 
  https://webpack.docschina.org/concepts/#%E8%BE%93%E5%87%BAoutput
  在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中
  */
  output: {
    path: resolvePath('dist'),
    filename: '[name].[chunk:8].js',
  },
  /* 
  外部扩展：https://webpack.docschina.org/configuration/externals/
  可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问（此教程使用了静态资源托管库）
  */
  externals: {
    React: 'React',
    'React-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      minify: {
        removeComments: devMode, // 移除HTML中的注释
        collapseWhitespace: devMode, // 删除空白符与换行符
        removeAttributeQuotes: devMode, //删除双引号
        minifyCSS: devMode, // 压缩内联css
      },
      favicon: resolvePath('public/jairwin.ico')
    }),
    // 在打包之前，可以删除dist文件夹下的所有内容
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new AntdDayjsWebpackPlugin()
  ],
  /* 
  https://webpack.docschina.org/configuration/module/
  */
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  {targets: {browsers: "last 2 versions"}} // or whatever your project requires
                ],
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: [
                // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                ["@babel/plugin-proposal-class-properties", {loose: true}],
                "react-hot-loader/babel"
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory([
                    {style: true}
                  ])
                ]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 仅仅在 development 模式下开启 hmr
              hmr: process.env.NODE_ENV === 'development',
              // 如果 hmr 不工作, 请开启强制选项
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(less)$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "postcss-loader"
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              modifyVars: {
                '@primary_btn': '#2598ff',
                '@detail_btn': '#2db7f5',
                '@edit_btn': '#8354ee',
                '@delete_btn': '#ff4d4f',
                '@white': '#fff',
                '@black': '#333',
              },
              javascriptEnabled: true
            },
          },
        }]
      },
      {
        test: /\.(png|jpe?g|gif|bmp|eot|woff|woff2|ttf|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            limit: 2048 // 如果图片大小大于2048【2kb】字节的话，那就像file-loader下被打包到dist/images下，//否则会被打包成Base64的字符串放在bundle.js下
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:8].[ext]',
            limit: 10240
          }
        }
      },
    ],
  },
  /* 
  https://www.webpackjs.com/configuration/resolve/
  */
  resolve: {
    // 自动解析确定的扩展，可以在引入模块时不带扩展
    extensions: ['.js', '.jsx', '.json', '.less', '.ts', '.tsx'],
    // 路径别名
    alias: {
      '@components': resolvePath('src/components'),
      '@api': resolvePath('src/api'),
      '@const': resolvePath('src/const'),
      '@img': resolvePath('src/assets/img'),
      '@less': resolvePath('src/assets/css'),
      '@media': resolvePath('src/assets/media'),
    }
  },
  optimization: {
    splitChunks: { //启动代码分割，有默认配置项（同步代码）
      chunks: 'all'
    },
    splitChunks: { //启动代码分割,不写有默认配置项
      chunks: 'all',//参数all/initial/async，只对所有/同步/异步进行代码分割
      minSize: 30000, //大于30kb才会对代码分割
      maxSize: 0,
      minChunks: 1,//打包生成的文件，当一个模块至少用多少次时才会进行代码分割
      maxAsyncRequests: 5,//同时加载的模块数最多是5个
      maxInitialRequests: 3,//入口文件最多3个模块会做代码分割，否则不会
      automaticNameDelimiter: '~',//文件自动生成的连接符
      name: true,
      cacheGroups: {//对同步代码走缓存组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,//谁优先级大就把打包后的文件放到哪个组
          filename: 'vendors.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,//模块已经被打包过了，就不用再打包了，复用之前的就可以
          filename: 'common.js' //打包之后的文件名   
        }
      }
    }
  },
}