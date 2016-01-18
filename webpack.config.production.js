var webpack = require('webpack');
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
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		}),
		new webpack.ProvidePlugin({
			'Promise': 'es6-promise',
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
};
