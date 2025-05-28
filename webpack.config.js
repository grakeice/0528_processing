import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";

export default {
	entry: {
		index: path.resolve(import.meta.dirname, "./src/ts/index"),
	},
	output: {
		filename: "js/[name].js",
		path: path.resolve(import.meta.dirname, "./dist"),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/, // 対象にするファイルを指定
				use: [
					MiniCssExtractPlugin.loader, // JSとCSSを別々に出力する
					"css-loader",
					"sass-loader",
					// 下から順にコンパイル処理が実行されるので、記入順序に注意
				],
			},
		],
	},
	plugins: [
		// new CleanWebpackPlugin({
		// 	cleanOnceBeforeBuildPatterns: [
		// 		"**/*",
		// 	],
		// }),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "style/[name].css",
		}),
	],
	resolve: {
		extensions: [".ts", ".js", ".scss"],
	},
	watchOptions: {
		ignored: /node_modules/,
	},
};
