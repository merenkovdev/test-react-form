const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env = {}) => {
	const { mode = 'development' } = env;

	const isProd = mode === 'production';
	const isDev = mode === 'development';

	const filename = (ext) =>
		isProd ? `[name].[hash].${ext}` : `[name].${ext}`;

	const getStyleLoaders = () => {
		return [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: [
						require('autoprefixer')({}),
					]
				},
			},
		];
	};

	const getPlugins = () => {
		const plugins = [
			new HtmlWebpackPlugin({
				template: path.resolve('index.html'),
			}),
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: filename('css'),
			}),
		];

		if (isProd) {
			plugins.push(
				new OptimizeCssAssetsPlugin({
					assetNameRegExp: /\.css$/g,
					cssProcessor: require('cssnano'),
					canPrint: true
				})
			);
		}

		return plugins;
	};

	return {
		context: path.resolve(__dirname, 'src'),
		mode:  isProd ? 'production' : 'development',
		devtool: isDev ? 'source-map' : false,
		resolve: {
			modules: [
				path.resolve(__dirname),
				path.resolve(__dirname, 'node_modules'),
			]
		},
		entry: {
			main: [ './index.js'],
		},
		devServer: {
			hot: isDev,
		},
		output: {
			filename: filename('js'),
			path: path.resolve(__dirname, 'dst'),
		},
		plugins: [...getPlugins()],
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