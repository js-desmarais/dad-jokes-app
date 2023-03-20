const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development',
	entry: { bundle: path.resolve(__dirname, 'src/index.js') },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][contenthash].js',
		clean: true, // will only keep one file instead of one per time the build cmd was ran
		assetModuleFilename: '[name][ext]', // keeps the existing asset filename.
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 3000, // for front-end
		open: true, // will open the browser
		hot: true, // will hot-reload
		compress: true, //enable gzip compression
		historyApiFallback: true, // ??
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack App',
			filename: 'index.html',
			template: 'src/template.html',
		}),
		new BundleAnalyzerPlugin(),
	],
};
