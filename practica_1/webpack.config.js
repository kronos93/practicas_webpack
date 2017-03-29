const { resolve } = require('path');
const webpack = require('webpack');

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);
var entry = PRODUCTION 
	? 	[
			'./src/index.js'
		]
	: 	[
			'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
			'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
			'./src/index.js'		
		];
var plugins = PRODUCTION
	? 	[
			new webpack.optimize.UglifyJsPlugin(),
		]
	: 	[
			new webpack.HotModuleReplacementPlugin(),
		    // enable HMR globally

		    new webpack.NamedModulesPlugin(),
		    // prints more readable module names in the browser console on HMR updates
		];
plugins.push(
	new webpack.DefinePlugin({
		DEVELOPMENT :  JSON.stringify(DEVELOPMENT),
		PRODUCTION :  JSON.stringify(PRODUCTION),
	})
);
const config = {
//module.exports 
	externals: {
		jquery: 'jQuery' //jquery is external and available at the global variable jQuery
	},
	devtool: 'inline-source-map',	
	//context: resolve(__dirname, 'src'),
	entry : entry,	
	plugins: plugins,
    'module': {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }]
    },
    'output': {
        'path': resolve(__dirname, 'dist'),
        'publicPath': './dist/',
        'filename': 'bundle.js'
    },

};

module.exports = config;