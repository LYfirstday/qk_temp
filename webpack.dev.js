const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
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
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};

module.exports = merge(baseConfig, devConfig);
