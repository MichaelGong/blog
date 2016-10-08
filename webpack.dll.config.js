const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
var ENV = process.env.NODE_ENV || 'development';
var isDev = ENV === 'development';

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
      'whatwg-fetch'
    ]
  },
  output: {
    path: path.join(__dirname, 'client', 'dist'),
    publicPath: './client/dist/',
    filename: isDev ? 'dll.[name].js' : 'dll.[name].[hash].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.join(__dirname, 'client'),
      path: './client/manifest.json',
      name: '[name]'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, './index.tpl'),
      template: path.join(__dirname, './index.tpl')
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        // 是否保留注释,默认为false
        comments: false
      }
    })
  ]
};
