const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
// 把css样式从js文件中提取到单独的css文件中, 会将所有的css样式合并为一个css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css文件
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

// production development
module.exports = {
  mode: 'development',
  devtool: 'eval',
  watch: true,
  entry: {
    main: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [{
        test: /\.less$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true
            }
          }, //替换之前的 style-loader
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          'postcss-loader',
          'less-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js[x]?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240, //10K
            esModule: false
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin({}),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:5].css",
      chunkFilename: "[id].css",
    }),
    new OptimizeCssPlugin()
  ],
  devServer: {
    contentBase: './lib',
    port: 5000,
    hot: true, // 开启热更新模式！当你修改了代码，你再也不用手动刷新页面了，浏览器会自动帮忙刷新！
    open: true, // 当我们打包完成，自动打开浏览器，自动加载我们的index.html页面
    historyApiFallback: true, // 如果我们的页面发生404了，就会去index.html页面，而不是直接抛一个错误页面
    overlay: true, // 如果代码发生了错误，直接把错误情况显示在浏览器的页面上！
    progress: true, // 显示你打包的进程
    // proxy: { // 配置跨域代理
    //   '/api': {
    //       target: 'http://localhost:4000',
    //       pathRewrite: {
    //           '/api': ''
    //       }
    //   }
    // }
  },
  resolve: {
    modules: ['./src/components', 'node_modules'], //从左到右依次查找第三方模块
    alias: { // 包别名配置
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, "src/components"),
      '@resources': path.resolve(__dirname, "src/resources"),
    },
    extensions: ['.jsx', '.js'],
  },
  optimization: {
    splitChunks: {
      // 对所有的包进行拆分
      chunks: 'all',
    },
  }
};
