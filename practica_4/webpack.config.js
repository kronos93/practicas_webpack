let config = function(env) {
    let port = 3030;
    let absolutePath = "http://192.168.1.10/debug/js/practicas_webpack/practica_4/dist/";
    let relativePath = "http://localhost:" + port + "/";
    const OfflinePlugin = require('offline-plugin');
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
    let publicPath = (isProduction) ? absolutePath : relativePath;
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
    const GulpWebpackSplitHtmlPlugin = require('./build/plugins/GulpWebpackSplitHtmlPlugin');
    const AppCachePlugin = require('appcache-webpack-plugin');
    return {
        context: resolve(__dirname, 'src'), //Contexto de entrada de archivos
        externals: {
            jquery: 'jQuery'
        },
        entry: {

            app: [

                './app.js',
                './style.css',
                './style.scss',
            ],
            vendor: [
                'bootstrap/dist/js/bootstrap.js', 'admin-lte/dist/js/app.js'
            ],
        },
        output: {
            filename: 'js/[name].bundle.[hash].js', //Archivo o carpeta + nombre del archivo de salida
            chunkFilename: 'js/[name].bundle.[chunkhash].js',
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
                /* {
                    test: /\.css$/,
                    use: useConfigCss,
                }, */
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
            new FaviconsWebpackPlugin({
                // Your source logo
                logo: './icon.png',
                // The prefix for all image files (might be a folder or a name)
                prefix: 'icons/', //[hash]
                // Emit all stats of the generated icons
                emitStats: false,
                // The name of the json containing all favicon information
                statsFilename: 'iconstats.json', //[hash]
                // Generate a cache file with control hashes and
                // don't rebuild the favicons until those hashes change
                persistentCache: true,
                // Inject the html into the html-webpack-plugin
                inject: true,
                // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
                background: '#fff',
                // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
                title: 'Aplicación de control de agremiados',
                // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: false
                }
            }),
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

            new webpack.HashedModuleIdsPlugin(),

            //new BundleAnalyzerPlugin(),
            new webpack.HotModuleReplacementPlugin(), // Enable HMR
            new webpack.NamedModulesPlugin(),
            new CleanWebpackPlugin('./dist/*'),
            new GulpWebpackSplitHtmlPlugin(),
            function() {
                this.plugin('done', stats => {
                    require('fs').writeFileSync(
                        resolve(__dirname, 'dist/plugin.webpack.manifest.json'),
                        JSON.stringify(stats.toJson().assetsByChunkName)
                    );
                });
            },
            new AppCachePlugin(),
            // it's always better if OfflinePlugin is the last plugin added
            /* new OfflinePlugin({
                safeToUseOptionalCaches: true,


                ServiceWorker: {
                    events: true
                },
                AppCache: {
                    events: true
                }
            }), */
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