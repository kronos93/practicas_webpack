const { resolve } = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

var entry = {
    'app': ['./src/js/app.js'],
    'contact': ['./src/js/contact.js']
};
//Alterar entry para HMR
if (process.env.NODE_ENV !== 'production') {
    for (let ent in entry) {
        entry[ent].unshift('webpack-dev-server/client?http://localhost:9000');
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        entry[ent].unshift('webpack/hot/only-dev-server');
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
    }
}
//Regla development/production para SASS
var rulesSass = (process.env.NODE_ENV === 'production') ? {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary 
            use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader',
                'sass-loader'
            ]
        }) //Sin HMR
} : {
    test: /\.scss$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1
            }
        },
        'postcss-loader',
        'sass-loader'
    ], //Para HMR
};

const config = {
    entry: entry,
    output: {
        path: resolve(__dirname, 'dist'),
        //publicPath: "http://localhost/practicas_webpack/practica_2/dist/",
        publicPath: 'http://localhost/practicas_webpack/practica_2/dist/',
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
                            importLoaders: 1
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
                            outputPath: "img/",
                            publicPath: 'http://localhost/practicas_webpack/practica_2/dist/img/',
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
                        publicPath: 'http://localhost/practicas_webpack/practica_2/dist/fonts/',
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
            hash: true,

        }),
        new HtmlWebpackPlugin({
            filename: 'contacto.html',
            template: './src/templates/contacto.html',
            title: 'Contacto WEBPACK',
            chunks: ['contact'],
            minify: {
                collapseWhitespace: true
            },
            hash: true,

        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production')
        }),
        new ExtractTextPlugin("./css/bundle.css"),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new CleanWebpackPlugin(['dist']),
    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: "errors-only", //PRESET para solo errores
        open: true, //Abre el navegador
        hot: true,
    },
    stats: {
        colors: true
    }
}

module.exports = (config);