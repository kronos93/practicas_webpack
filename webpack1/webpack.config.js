const webpack = require('webpack');
const { resolve } = require('path');
const WebpackValidator = require('webpack-validator');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

console.log(process.env.NODE_ENV);

var entry = PRODUCTION ? [
    './src/script1.js',
    './src/script2.js'
] : [
    './src/script1.js',
    './src/script2.js'
];
var plugins = PRODUCTION ? [
    new webpack.optimize.UglifyJsPlugin()
] : [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
];
var devtools = PRODUCTION ? [] : [];
const config = {
    'entry': entry,
    'plugins': plugins,
    'module': {
        'loaders': [{
            'test': /\.js$/,
            'exclude': /node_modules/,
            'loader': "babel-loader"
        }]
    },
    'output': {
        'path': resolve(__dirname, 'dist/js'),
        'publicPath': './dist/js/',
        'filename': 'bundle.js'
    },
    'stats': {
        'colors': true
    }
};
module.exports = WebpackValidator(config);