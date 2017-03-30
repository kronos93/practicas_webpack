const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { resolve } = require('path');
const webpack = require('webpack');
/*
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
*/
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
var entry = {
    'app': ['./src/js/app.js'],
    'contact': ['./src/js/contact.js']
}
if (process.env.NODE_ENV !== 'production') {
    for (let ent in entry) {
        entry[ent].unshift('webpack-dev-server/client?http://localhost:9000');
        entry[ent].unshift('webpack/hot/only-dev-server');
    }
}
const config = {
    entry: entry,
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js' //Nombre del archivo de salida
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
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader?name=[name].[ext]'],
                //use: ['file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/'],
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                use: ['url-loader'],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
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
        new ExtractTextPlugin("bundle.css"),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
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

module.exports = config;