let config = function(env) {

    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    // Create multiple instances
    const extractCSS = new ExtractTextPlugin({ filename: 'css/[name]-one.css' });
    const extractSASS = new ExtractTextPlugin({ filename: 'css/[name]-two.css' });

    const HtmlWebpackPlugin = require('html-webpack-plugin');

    //Funcion nativa de NODEJS
    const { resolve } = require('path');
    const webpack = require('webpack');
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const CleanWebpackPlugin = require('clean-webpack-plugin');
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
                'bootstrap/dist/js/bootstrap.js', 'admin-lte/dist/js/app.js'
            ],
            app: './app.js',

        },
        output: {
            filename: './[name].bundle.js', //Archivo o carpeta + nombre del archivo de salida
            chunkFilename: '[name].bundle.js',
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
                //images y fuentes con url loader
                {
                    test: /\.(png|gif|svg|png)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                },
                //imagenes con file loader
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
                        outputPath: "img/",
                        publicPath: "http://localhost/practicas_webpack/practica_4/dist/",
                    }
                },
                //fonts con file loader
                {
                    test: /\.(eot|ttf|woff|woff2|svg)$/,
                    loader: 'file-loader',
                    options: {
                        //query: {
                        //useRelativePath: true, //process.env.NODE_ENV === "production"
                        //},
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        publicPath: "http://localhost/practicas_webpack/practica_4/dist/", //corregir*
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

            }),
            new HtmlWebpackPlugin({
                template: './template.1.html',
                title: "Mi aplicación",
                filename: 'index.html',

            }),
            //Exporta módulos compartidos por entrada
            new webpack.optimize.CommonsChunkPlugin('vendor'),
            /*new BundleAnalyzerPlugin(),*/
            new CleanWebpackPlugin('./dist/*'),
        ]

    };

};
//Exportar módulos nativos, sintaxis de NodeJs
module.exports = config;

//Investigar resolve url-loder