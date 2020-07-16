const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path')
const srcDir = path.join(__dirname, "../src");
console.log(srcDir);
console.log(`${srcDir}/index.html`);
// console.log(path.resolve(__dirname, 'public/index.html'));
// console.log(__dirname + '/src');
module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    filename: '[hash].js'
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      // filename: 'index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              // javascriptEnabled: true,
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
        // loaders: [
        //   {
        //     loader:'less-loader?sourceMap=true',
        //     options:{
        //         javascriptEnabled: true
        //     },
        //   }
        // ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 8088,
    compress: true,
    hot: true,
    inline: true
  }
}