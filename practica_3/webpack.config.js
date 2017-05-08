const webpack = require('webpack');
//Funcion nativa de NODEJS
const { resolve } = require('path');
//Variable de entorno
const PRODUCTION = (process.env.NODE_ENV === 'production') ? true : false;
//Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
console.log(PRODUCTION);
const config = {
    //Entrada
    entry: [
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:9000',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',
        './src/script.js'
    ],
    //Salida
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/', // necessary for HMR to know where to load the hot update chunks
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './templates/template.html',
            /*template: './src/templates/template.html',*/
            /* alwaysWriteToDisk: true,*/
        }),
        /*new HtmlWebpackHarddiskPlugin(),*/
        //Plugin para pasar una variable a los scripts generales
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(PRODUCTION)
        }),
        //Plugins para el HMR
        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin('./dist/*'),
    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'), // match the output path
        compress: true,
        port: 9000,
        stats: "errors-only", //PRESET para solo errores
        /*watchContentBase: true,*/
        publicPath: '/', // match the output `publicPath`
        open: true, //Abre el navegador
        hot: true, // enable HMR on the server
    },
    context: __dirname,
    stats: (PRODUCTION) ? "errors-only" : "verbose" //PRESET para los colores en consola
};
module.exports = config;