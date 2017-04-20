//Globals
const webpack = require('webpack');
const { resolve } = require('path');
//Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Vars 
const extractSCSS = new ExtractTextPlugin('./css/bundle.css');
const sourceMap = process.env.NODE_ENV === 'development';
const path_altas = __dirname + '\\..\\javaScript\\alta_de_informacion\\ventas\\';
const useInCSS = (process.env.NODE_ENV === 'production') ?
    extractSCSS.extract({
        fallback: 'style-loader',
        //resolve-url-loader may be chained before sass-loader if necessary 
        use: [{
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    sourceMap: sourceMap,
                }
            },
            /*{
                loader: 'postcss-loader'
            },*/
            {
                loader: "sass-loader",
                options: {
                    sourceMap: sourceMap
                }
            }
        ]
    }) : //Sin HMRs
    [{
            loader: "style-loader" // creates style nodes from JS strings
        },
        {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
                importLoaders: 1,
                /*sourceMap: true,*/
            }
        },
        /*{
            loader: "postcss-loader" // compiles Sass to CSS
        },*/
        {
            loader: "sass-loader" // compiles Sass to CSS
        }

    ];
const publicPath = (process.env.NODE_ENV === 'production') ? 'http://localhost/sistema_contable/assets/dist/' : 'http://localhost/sistema_contable/assets/dist/';
const config = {
    entry: {
        bundle: ['./src/js/index.js'],
    },
    /*externals: {
        jquery: 'jQuery'
    },*/
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: useInCSS,
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'template.php',
            template: './src/template/template.html',
        }),
        new webpack.DefinePlugin({
            path_altas: JSON.stringify(path_altas)
        }),
        //Clean dist folder
        new CleanWebpackPlugin(['./dist/*']),
        //Extrac CSS from SASS
        extractSCSS,
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        publicPath: publicPath,
        filename: '[name].js'
    },
    stats: {
        colors: true,
    }
};
module.exports = config;