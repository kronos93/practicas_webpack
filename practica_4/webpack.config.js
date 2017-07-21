let config = function(env) {
    let port = 3030;
    let absolutePath = "http://localhost/practicas_webpack/practica_4/dist/";
    let relativePath = "http://localhost:" + port + "/";

    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
    //Funcion nativa de NODEJS
    const { resolve } = require('path');
    const webpack = require('webpack');
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const isProduction = (env.production === 'true') ? true : false;
    console.log('is prod: ' + isProduction);
    let publicPath = (isProduction) ? "http://localhost/practicas_webpack/practica_4/dist/" : relativePath;
    /*
     * Configuración para cargar estilos css
     */
    // Crear multiple instancias
    const extractCSS = new ExtractTextPlugin({ filename: 'css/[name]-one.css' });
    const extractSASS = new ExtractTextPlugin({ filename: 'css/[name]-two.css' });
    const ProdConfigCss = extractCSS.extract({
        fallback: "style-loader",
        use: ["css-loader"]
    });
    const DevConfigCss = ['style-loader', 'css-loader'];
    const useConfigCss = (isProduction) ? ProdConfigCss : DevConfigCss;
    const ProdConfigSass = extractSASS.extract({
        fallback: "style-loader",
        use: ["css-loader", 'sass-loader', ]
    });
    const DevConfigSass = ['style-loader', 'css-loader', 'sass-loader'];
    const useConfigSass = (isProduction) ? ProdConfigSass : DevConfigSass;
    /*
     **Archivos de configuración de gulp
     */
    let GulpWebpackSplitHtmlPlugin = require('./build/plugins/GulpWebpackSplitHtmlPlugin');

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
            filename: 'js/[name].bundle.js', //Archivo o carpeta + nombre del archivo de salida
            chunkFilename: 'js/[name].bundle.js',
            path: resolve(__dirname, 'dist'),
            publicPath: publicPath,
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
                        publicPath: publicPath,
                    }
                },
                //fonts con file loader
                {
                    test: /\.(eot|ttf|woff|woff2|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: "fonts/[name].[ext]",
                        publicPath: publicPath,
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
                minify: {
                    collapseWhitespace: isProduction
                },
            }),
            new HtmlWebpackPlugin({
                template: './template.html',
                title: "<?= $title ?>",
                filename: './template/template.html',
            }),
            //Exporta módulos compartidos por entrada
            /*  new webpack.optimize.CommonsChunkPlugin({
                 name: "vendor",
             }), */
            /* new webpack.optimize.CommonsChunkPlugin({
                name: 'common' // Specify the common bundle's name.
            }), */
            //new BundleAnalyzerPlugin(),
            new webpack.HotModuleReplacementPlugin(), // Enable HMR
            new webpack.NamedModulesPlugin(),
            new CleanWebpackPlugin('./dist/*'),
            new GulpWebpackSplitHtmlPlugin(),
        ],
        devServer: {
            contentBase: resolve(__dirname, 'dist'),
            publicPath: publicPath,
            port: port,
            hot: true,
            hotOnly: true,
            stats: "errors-only",
            compress: true,
            public: "myapp.test:" + port,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        },
        stats: (isProduction) ? 'errors-only' : 'detailed',
    };

};
//Exportar módulos nativos, sintaxis de NodeJs
module.exports = config;
//Investigar resolve url-loader