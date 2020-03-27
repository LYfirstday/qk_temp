const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
// 把css样式从js文件中提取到单独的css文件中, 会将所有的css样式合并为一个css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'build/[name].[hash:8].js'
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
            name: '[name].[ext]',
            outputPath: 'static/',
            esModule: false
          }
        }],
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:5].css",
      chunkFilename: "[id].css",
    })
  ],
  externals: {},
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
