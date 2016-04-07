var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var mainPath = path.resolve(__dirname, 'src', 'index.jsx');
var buildPath = path.resolve(__dirname, 'public');

module.exports = {
	entry: {
		'setmine': mainPath
	},
	devtool: 'source-map',
	output: {
		path: buildPath,
		filename: '/[name]-bundle.js',
	},
	resolve: {
		extensions: ['', '.jsx', '.js', '.less'],
		moduleDirectories: ['node_modules']
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, 'src')
				],
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less')
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		}),
		new webpack.ProvidePlugin({
			'Promise': 'exports?global.Promise!es6-promise',
			'fetch': 'exports?self.fetch!whatwg-fetch'
		}),
		new ExtractTextPlugin('/[name].css'),
		new webpack.DefinePlugin({
		  'process.env': {NODE_ENV: '"production"'}
		})
	],
	postcss: [
		require('autoprefixer')
	]
};
