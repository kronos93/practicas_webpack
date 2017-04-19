const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var PRODUCTION = process.env.NODE_ENV === 'production';

var publicPath = PRODUCTION ? 'http://192.168.1.10/debug/js/practicas_webpack/practica_2/dist/' : 'http://192.168.1.10:9000/';

var entry = {
    'app': ['./src/js/app.js'],
    //'contact': ['./src/js/contact.js']
};
//Alterar entry para HMR
if (process.env.NODE_ENV !== 'production') {
    for (let ent in entry) {
        //entry[ent].unshift('webpack-dev-server/client?' + publicPath);
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        //entry[ent].unshift('webpack/hot/only-dev-server');
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
    }
}
console.log(entry);
//Regla development/production para SASS
var rulesSass = (process.env.NODE_ENV === 'production') ? {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary 
            use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        /*sourceMap: true,*/
                    }
                },
                'postcss-loader',
                {
                    loader: "sass-loader",
                    /*options: {
                        sourceMap: true
                    }*/
                }
            ]
        }) //Sin HMR
} : {
    test: /\.scss$/,
    use: [{
            loader: "style-loader" // creates style nodes from JS strings
        },
        {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
                importLoaders: 1,
                /*sourceMap: true,*/
            }
        },
        {
            loader: "postcss-loader" // compiles Sass to CSS
        },
        {
            loader: "sass-loader" // compiles Sass to CSS
        }

    ], //Para HMR
};

const config = {
    entry: entry,
    output: {
        path: resolve(__dirname, 'dist'),
        publicPath: publicPath,
        filename: '[name].js', //Nombre del archivo de salida
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    },
                    'postcss-loader'
                ]
            },
            rulesSass,
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    //'file-loader?name=[name].[ext]&outputPath=img/&publicPath=http://localhost/practicas_webpack/practica_2/dist/img/',
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]",
                            outputPath: 'img/',
                            publicPath: publicPath + 'img/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader'
            },
            {
                test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    //use: 'file-loader?name=[name].[ext]&publicPath=http://localhost/practicas_webpack/practica_2/dist/css/fonts/&outputPath=css/fonts/',
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        publicPath: publicPath + 'fonts/',
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader"
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/templates/index.html',
            title: 'Practicas WEBPACK',
            excludeChunks: ['contact'],
            minify: {
                collapseWhitespace: true
            },
            alwaysWriteToDisk: true,
        }),
        /* new HtmlWebpackPlugin({
             filename: 'contacto.html',
             template: './src/templates/contacto.html',
             title: 'Contacto WEBPACK',
             chunks: ['contact'],
             minify: {
                 collapseWhitespace: true
             },
             hash: true,
             cache: false,
             alwaysWriteToDisk: true,
         }),
         new HtmlWebpackPlugin({
             filename: 'header.php',
             template: './src/templates/header.php',
             minify: {
                 collapseWhitespace: true
             },
             inject: false,
             hash: true,
             cache: false,
             alwaysWriteToDisk: true,
         }),
         new HtmlWebpackPlugin({
             filename: 'scripts.php',
             template: './src/templates/scripts.php',
             minify: {
                 collapseWhitespace: true
             },
             inject: true,
             hash: false,
             cache: false,
             alwaysWriteToDisk: true,
         }),
         new HtmlWebpackPlugin({
             filename: 'footer.php',
             template: './src/templates/footer.php',
             minify: {
                 collapseWhitespace: true
             },
             xhtml: true,
             inject: false,
             hash: false,
             cache: false,
             alwaysWriteToDisk: true,
         }),*/
        //new HtmlWebpackHarddiskPlugin({ outputPath: resolve(__dirname, 'dist') }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production')
        }),
        new ExtractTextPlugin("./css/bundle.css"),
        /*        new BrowserSyncPlugin(
                    // BrowserSync options 
                    {
                        // browse to http://localhost:3000/ during development 
                        host: 'localhost',
                        port: 9001,
                        // proxy the Webpack Dev Server endpoint 
                        // (which should be serving on http://localhost:3100/) 
                        // through BrowserSync 
                        proxy: 'http://localhost:9000/'
                    },
                    // plugin options 
                    {
                        // prevent BrowserSync from reloading the page 
                        // and let Webpack Dev Server take care of this 
                        reload: false
                    }
                ),*/
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        //new CleanWebpackPlugin(['dist']),
    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        host: '192.168.1.10',
        compress: true,
        port: 9000,
        stats: "errors-only", //PRESET para solo errores
        watchContentBase: true,
        open: true, //Abre el navegador
        hot: true,
    },
    stats: {
        colors: true
    },
    //devtool: 'source-map'
};

module.exports = (config);



//Globals
const webpack = require('webpack');
const { resolve } = require('path');
//Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
//Vars 
const extractSCSS = new ExtractTextPlugin('./css/bundle.css');
var sourceMap = false;
const config = {
    entry: {
        bundle: ['./src/js/index.js'],

    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSCSS.extract({
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
                }) //Sin HMRs
        }],
    },
    plugins: [
        //Clean dist folder
        new CleanWebpackPlugin(['./dist/*.*']),
        //Extrac CSS from SASS
        extractSCSS,
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    stats: {
        colors: true,
    }
};
module.exports = config;