/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var hotMiddleWareScript =
  'webpack-hot-middleware/client?reload=true';
var ENV = process.env.NODE_ENV || 'development';
var isDev = ENV === 'development';
var port = 3001;

module.exports = {
  port: port,
  entry: {
    index: isDev ? ['./client/src/index.js', 'webpack-hot-middleware/client'] : ['./client/src/index.js']
  },
  output: {
    path: path.join(__dirname, 'client', 'dist'),
    filename: isDev ? '[name].js' : '[name].[hash].js',
    publicPath: '/client/dist',
    chunkFilename: isDev ? '[name].js' : '[name].[hash].js'
  },
  module: {
    noParse: [
      // 'editormd',
      'jquery'
    ],
    loaders: [{
      test: /\.js$/,
      loaders: (ENV === 'production' || ENV === 'testing') ? ['babel'] : ['react-hot', 'babel'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!less')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!sass')
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(jpg|jpeg|gif|png)$/i,
      loader: 'file'
    }, {
      test: /\.woff(2)?(\??.*)$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\??.*)$/,
      loader: 'file-loader'
    }]
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  babel: {
    presets: ['es2015', 'stage-0', 'react'],
    cacheDirectory: true,
    plugins: ['transform-runtime', ['antd', [{ 'libraryName': 'antd', 'style': true }]]]
  },
  resolve: {
    alias: {
      jquery: path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js'),
      editormd: path.join(__dirname, 'node_modules', 'editor.md', 'editormd.js'),
      prettify: path.join(__dirname, 'node_modules', 'editor.md', 'lib', 'prettify.min.js'),
      CodeMirror: path.join(__dirname, 'node_modules', 'editor.md', 'lib', 'codemirror', 'codemirror.min.js'),
      marked: path.join(__dirname, 'node_modules', 'marked', 'lib', 'marked.js'),
      'editormd.css': path.join(__dirname, 'node_modules', 'editor.md', 'css', 'editormd.css')
    },
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin((ENV === 'production' || ENV === 'testing') ?
      '[name]-[chunkhash].css' : '[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.DedupePlugin(), // 删除重复的
    new webpack.optimize.OccurrenceOrderPlugin(), // 模块调用次数，给模块分配ids
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'client'),
      manifest: require('./client/manifest.json')
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, './index.html'),
      template: path.join(__dirname, './index.tpl'),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      editormd: 'editormd',
      marked: 'marked',
      CodeMirror: 'CodeMirror'
    })
  ],
  devtool: 'source-map'
  // devServer: {
  //   host: '0.0.0.0',
  //   port: '3001',
  //   hot: true,
  //   inline: true,
  //   historyApiFallback: true,
  //   colors: true,
  //   compress: true,
  //   progress: true
  // }
};
