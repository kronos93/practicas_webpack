const ExtractTextPlugin = require("extract-text-webpack-plugin");
// Create multiple instances
const extractCSS = new ExtractTextPlugin('[name]-one.css');
const extractSASS = new ExtractTextPlugin('[name]-two.css');

const HtmlWebpackPlugin = require('html-webpack-plugin');

//Funcion nativa de NODEJS
const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


let config = function(env) {
    const PRODUCTION = (env.production === 'true') ? true : false;

    const useProdConfigCss = extractCSS.extract({
        fallback: "style-loader",
        use: "css-loader"
    });
    const useDevConfigCss = ['style-loader', 'css-loader'];
    const useConfigCss = (PRODUCTION) ? useProdConfigCss : useDevConfigCss;

    const useProdConfigSass = extractSASS.extract({
        fallback: "style-loader",
        use: ["css-loader", 'sass-loader']
    });
    const useDevConfigSass = ['style-loader', 'css-loader', 'sass-loader'];
    const useConfigSass = (PRODUCTION) ? useProdConfigSass : useDevConfigSass;

    return {
        context: resolve(__dirname, 'src'), //Contexto de entrada de archivos
        externals: {
            jquery: 'jQuery'
        },
        entry: {
            vendor: [
                'bootstrap/dist/js/bootstrap.js'
            ],
            app: './app.js',

        },
        output: {
            filename: './[name].js', //Archivo o carpeta + nombre del archivo de salida
            path: resolve(__dirname, 'dist'),
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: useConfigSass,
                },
                {
                    test: /\.css$/,
                    use: useConfigCss,
                },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                },

                //Configuración especial para datatables y archivos.js
                {
                    test: /datatables\.net.*\.js$/,
                    use: [{
                        loader: 'imports-loader?define=>false'
                    }]
                }
            ]
        },
        plugins: [
            //new ExtractTextPlugin("app.css"), Una sola instancia
            extractCSS,
            extractSASS,
            new HtmlWebpackPlugin({
                template: './template.html',
                title: "Mi aplicación",
                filename: 'admin.html',
                hash: true
            }),
            new HtmlWebpackPlugin({
                template: './template.1.html',
                title: "Mi aplicación",
                filename: 'index.html',
                hash: true
            }),
            //Exporta módulos compartidos por entrada
            /*new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
            }),*/
            new CleanWebpackPlugin('./dist/*'),
        ]

    };

};
//Exportar módulos nativos, sintaxis de NodeJs
module.exports = config;

//Investigar resolve url-loder