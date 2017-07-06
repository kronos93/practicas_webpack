let config = function(env) {

    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    // Create multiple instances
    const extractCSS = new ExtractTextPlugin({ filename: 'css/[name]-one.css' });
    const extractSASS = new ExtractTextPlugin({ filename: 'css/[name]-two.css' });

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
    //Funcion nativa de NODEJS
    const { resolve } = require('path');
    const webpack = require('webpack');
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const isProduction = (env.production === 'true') ? true : false;

    /*
     * Configuración para cargar estilos css
     */
    const ProdConfigCss = extractCSS.extract({
        fallback: "style-loader",
        use: ["css-loader"]
    });
    const DevConfigCss = ['style-loader', 'css-loader'];
    const useConfigCss = (isProduction) ? ProdConfigCss : DevConfigCss;
    /*
     * Configuración para cargar estilos sass
     */
    const ProdConfigSass = extractSASS.extract({
        fallback: "style-loader",
        use: ["css-loader", 'sass-loader', ]
    });
    const DevConfigSass = ['style-loader', 'css-loader', 'sass-loader'];
    const useConfigSass = (isProduction) ? ProdConfigSass : DevConfigSass;

    return {
        context: resolve(__dirname, 'src'), //Contexto de entrada de archivos
        externals: {
            jquery: 'jQuery'
        },
        entry: {
            vendor: [
                'bootstrap/dist/js/bootstrap.js', 'admin-lte/dist/js/app.js'
            ],
            app: [
                './app.js',
                './style.css',
                './style.scss',
            ],

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
                //imagenes con file loader
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: "img/[name].[ext]",
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
                        name: "fonts/[name].[ext]",

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
            extractCSS,
            extractSASS,
            new FaviconsWebpackPlugin('./icon.png'),
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
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
            }),
            new BundleAnalyzerPlugin(),
            new CleanWebpackPlugin('./dist/*'),
        ]

    };

};
//Exportar módulos nativos, sintaxis de NodeJs
module.exports = config;

//Investigar resolve url-loder