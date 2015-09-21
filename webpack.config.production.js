var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var buildPath = path.resolve(__dirname, 'public');
var mainPath = path.resolve(__dirname, 'src', 'index.jsx');


module.exports = {
  entry: {
    'setmine': mainPath
  },
  output: {
    path: buildPath,
    filename: '/[name]-bundle.js',
    pathinfo: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['', '.jsx', '.es6', '.js', '.scss'],
    moduleDirectories: ['node_modules']
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'body'
  })],
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.es6$/,
      loader: 'babel',
      exclude: /node_modules/
    },
    {
      test: /\.jsx$/,
      loader: 'jsx!babel',
      exclude: /node_modules/
    },
    {
      test: /\.js$/,
      loader: 'jsx!babel',
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap',
      exclude: /node_modules/
    }]
  }
};
