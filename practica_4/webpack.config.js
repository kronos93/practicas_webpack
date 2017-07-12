let config = function(env) {
    let publicPath = "http://localhost/practicas_webpack/practica_4/dist/";
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
            filename: '[name].bundle.js', //Archivo o carpeta + nombre del archivo de salida
            chunkFilename: '[name].bundle.js',
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
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
            }),
            //new BundleAnalyzerPlugin(),
            new CleanWebpackPlugin('./dist/*'),
            new GulpWebpackSplitHtmlPlugin(),
        ],
        stats: (isProduction) ? 'errors-only' : 'detailed',
    };

};
//Exportar módulos nativos, sintaxis de NodeJs
module.exports = config;
//Investigar resolve url-loader