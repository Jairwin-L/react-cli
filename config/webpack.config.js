'use strict';
/* 
	英文官网：https://webpack.js.org/
	其他中文网：https://webpack.docschina.org/
*/
const path = require('path');
const webpack = require('webpack');
// html-webpack-plugin：https://www.webpackjs.com/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin：https://github.com/johnagan/clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// html-webpack-externals-plugin：https://github.com/mmiller42/html-webpack-externals-plugin
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
// webpackbar：https://github.com/nuxt-contrib/webpackbar（可以显示build进度，和dev环境一致的效果）
const WebpackBar = require('webpackbar');
// 提供离线体验
// const OfflinePlugin = require('offline-plugin');
const WebpackHookPlugin = require('webpack-hook-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
// 生成包含构建hash的json文件：SPA会定期把初始 hash 和远程的 hash 相比较，并在不匹配的时候重新加载。
const BuildHashPlugin = require('build-hash-webpack-plugin');

const prodMode = process.env.NODE_ENV === 'production';
const resolvePath = (dir) => path.join(__dirname, '..', dir);
// https://cdn.baomitu.com
const externals = [
  {
    module: 'react',
    entry: '//lib.baomitu.com/react/17.0.1/umd/react.production.min.js',
    global: 'React',
  },
  {
    module: 'react-dom',
    entry: '//lib.baomitu.com/react-dom/17.0.1/umd/react-dom.production.min.js',
    global: 'ReactDOM',
  },
  {
    module: 'react-router-dom',
    entry: '//lib.baomitu.com/react-router-dom/5.2.0/react-router-dom.min.js',
    global: 'ReactRouterDOM',
  },
];

module.exports = {
  /* 
	第一项：
	react-hot-loader：https://github.com/gaearon/react-hot-loader
	开发模式的时候，会搭配热更新一起来使用。但是webpack-dev-server的hot，在更新时，会刷新整个页面。在react开发时，刷新了页面，会丢失以前的数据流，需要我们重新再去操作。这样很麻烦。所以需要一个新的插件，react-hot-loader，react-hot-loader不会刷新整个页面，它只是替换了修改的代码，做到了页面的局部刷新。
	*/
  // 第二项（入口文件）：https://webpack.docschina.org/concepts/#%E5%85%A5%E5%8F%A3entry
  entry: {
    app: ['react-hot-loader/patch', resolvePath('src/index.tsx')],
  },
  /* 
	https://webpack.docschina.org/concepts/#%E8%BE%93%E5%87%BAoutput
	在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中
	*/
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    // path: resolvePath('dist'),
    // 决定打包好的资源输出到 output.path 选项指定目录位置的文件名，如果只输出一个文件，可以把 filename 属性写成静态不变的名称。
    filename: 'js/[name]-[chunkhash:6].js',
    chunkFilename: 'js/[name]-[chunkhash:6].js',
  },
  /* 
	外部扩展：https://webpack.docschina.org/configuration/externals/
	可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问（此教程使用了静态资源托管库）
	*/
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeComments: prodMode, // 移除HTML中的注释
        collapseWhitespace: prodMode, // 删除空白符与换行符
        removeAttributeQuotes: prodMode, // 删除双引号
        minifyCSS: prodMode, // 压缩内联css
      },
      favicon: resolvePath('public/jairwin.ico'),
    }),
    // 在打包之前，可以删除dist文件夹下的所有内容
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 4096,
        configFile: './tsconfig.json',
      },
    }),
    new WebpackBar(),
    new HtmlWebpackExternalsPlugin({
      externals,
    }),
    // TODO:
    // new OfflinePlugin(),
    new WebpackHookPlugin({
      onBuildStart: ['echo "Webpack Start"'],
      onBuildEnd: ['echo "Webpack End"'],
    }),
    new BuildHashPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /dayjs/,
    }),
  ],
  /* 
	https://webpack.docschina.org/configuration/module/
	*/
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   // exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   include: [resolvePath('src')], // 指定检查的目录
      //   options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
      //     formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
      //   }
      // },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
                ],
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                'react-hot-loader/babel',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory([{ style: true }])],
              }),
              compilerOptions: {
                module: 'es2015',
              },
            },
          },
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/,
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
          'less-loader',
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
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
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|bmp|eot|woff|woff2|ttf|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            limit: 10240, // 如果图片大小大于 limit 字节的话，那就像url-loader下被打包到dist/img下，//否则会被打包成Base64的字符串放在bundle.js下
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:8].[ext]',
            limit: 10240,
          },
        },
      },
    ],
  },
  /* 
	https://www.webpackjs.com/configuration/resolve/
	*/
  resolve: {
    // 解析模块时应该搜索的目录 ,如果想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索：
    modules: [resolvePath('src'), 'node_modules'],
    // 自动解析确定的扩展，可以在引入模块时不带扩展
    extensions: ['.js', '.jsx', '.json', '.less', '.ts', '.tsx'],
    // 路径别名
    alias: {
      '@': resolvePath('src'),
      '@/constant': resolvePath('src/constant'),
      '@/components': resolvePath('src/components'),
      '@/api': resolvePath('src/api'),
      '@/utils': resolvePath('src/utils'),
      '@/css': resolvePath('src/assets/css'),
      '@/img': resolvePath('src/assets/img'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        styles: {
          name: 'styles',
          test: /\.(c|sa|sc)ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
