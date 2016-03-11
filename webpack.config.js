var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		setmine: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			'./src/index.jsx'
		]
	},
	devtool: 'cheap-source-map',
	devServer: {
		contentBase: './public', // where webpack-dev-server should look for static files
		historyApiFallback: true,
		colors: true,
		hot: true
	},
	output: {
		path: path.resolve(__dirname, 'public'), // where webpack saves bundled files
		filename: '[name]-bundle.js', // name of output file
	},
	resolve: {
		extensions: ['', '.jsx', '.js', '.less'],
		moduleDirectories: ['node_modules']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index-dev.html',
			inject: 'body'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			'Promise': 'exports?global.Promise!es6-promise',
			'fetch': 'exports?self.fetch!whatwg-fetch'
		})
	],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				// loader: 'babel',
				loaders: ['react-hot', 'babel'],
				include: [
					path.resolve(__dirname, 'src')
				],
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				loader: 'style!css!autoprefixer!less',
				exclude: /node_modules/
			}
		]
	}
};