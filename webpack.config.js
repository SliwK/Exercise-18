const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');


var env = process.env.NODE_ENV || 'development';
let plugins = [];

if (env === 'production') {

	plugins.push(
	    new webpack.optimize.UglifyJsPlugin(),
	    new OptimizeJsPlugin({
	      	sourceMap: false
	    })
	);
}

plugins.push(
	new HtmlWebpackPlugin({
		template: 'client/index.html',
		filename: 'index.html',
		inject: 'body'
	})
);


module.exports = {
    entry: (env !== 'production' ? [
          'react-hot-loader/patch',
          'webpack-dev-server/client?http://localhost:8080',
          'webpack/hot/only-dev-server',
    ] : []).concat(['./client/index.js']),
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
      rules: [
        {
            test: /\.js$/,
            loader: "babel-loader"
        },
        {
            test: /\.css$/,
            use: [
                { loader: 'style-loader'},
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ]
        }
      ]
    },
    plugins: plugins
};
