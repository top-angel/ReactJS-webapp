var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');

var buildPath = path.resolve(__dirname, 'public');
var mainPath = path.resolve(__dirname, 'src', 'index.jsx');

module.exports = {
	entry: {
		setmine: mainPath
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: 'public/' // where webpack-dev-server should look for static files
	},
	output: {
		path: buildPath,
		filename: '[name]-bundle.js' // name of output file
	},
	resolve: {
		extensions: ['', '.jsx', '.es6', '.js', '.less'],
		moduleDirectories: ['node_modules']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('style', 'css!less')
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index-dev.html',
			inject: 'body'
		}),
		new webpack.ProvidePlugin({
			'Promise': 'es6-promise',
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new ExtractTextPlugin('[name].css')
	],
};