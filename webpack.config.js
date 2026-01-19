// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ESLintPlugin = require('eslint-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
// const { webpack } = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    theme_js: path.resolve(__dirname, './src/main.js'),
    theme_css: path.resolve(__dirname, './src/styles.css'),
  },
  output: {
    filename: '[name].main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['./src/index.html'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    //new ESLintPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: './src/styles.css',
    // }),
    // new webpack.IgnoreEmitPlugin('styles.css'),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: '',
          //   },
          // },
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
