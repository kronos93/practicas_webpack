const webpack = require('webpack'); //to access built-in plugins

const config = {
  	entry: './src/script.js',
  	output: {
    	path: './build/',		//Construir
    	filename: 'bundle.js'  	//Envoltorio
  	},

  	module: {
	  	loaders: [
	    	{ 
	    		test: /\.js$/, 
	    		exclude: /node_modules/, 
	    		loader: "babel-loader" ,
	    		query: {
			        presets: ['es2015']
		      	}
	    	}
	  	]
	},
  	plugins: [
    	new webpack.optimize.UglifyJsPlugin(),
	],

};

module.exports = config;