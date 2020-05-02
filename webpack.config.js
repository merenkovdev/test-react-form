const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env = {}) => {
	const { mode = 'development' } = env;

	const isProd = mode === 'production';
	const isDev = mode === 'development';

	const filename = (ext) =>
		isProd ? `[name].[hash].${ext}` : `[name].${ext}`;

	const getStyleLoaders = () => {
		return [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			'css-loader'
		];
	};

	return {
		context: path.resolve(__dirname, 'src'),
		mode:  isProd ? 'production' : 'development',
		devtool: isDev ? 'source-map' : false,
		entry: {
			main: [ './index.js'],
		},
		devServer: {
			port: 4200,
			hot: isDev,
		},
		output: {
			filename: filename('js'),
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve('index.html'),
			}),
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: filename('css'),
			})
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.(css)$/,
					use: getStyleLoaders()
				},
				{
					test: /\.(s[ca]ss)$/,
					use: [ ...getStyleLoaders(), 'sass-loader' ]
				}
			]
		},
		optimization: {
			removeAvailableModules: true,
			minimizer: [
				new TerserPlugin({
					cache: true,
					sourceMap: isDev,
					terserOptions: {
						output: {
							comments: false,
						}
					},
				}),
			],
		},
	}
};