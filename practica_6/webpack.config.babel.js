import webpack from 'webpack';
import { resolve } from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
export default (env, argv) => {
    console.log(env);
    const PRODUCTION = (env) ? env.prod : false;
    return {
        context: resolve(__dirname, 'resources/assets/src'),
        entry: './js/script.js',
        output: {
            path: resolve(__dirname, './public/dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [{
                test: /\.pug$/,
                loader: 'pug-loader', //['html-loader', 'pug-loader']
            }, ],
        },
        plugins: [
            new CleanWebpackPlugin('./public/dist/*'),
            new HtmlWebpackPlugin({
                title: '<?= (isset($title) && !empty($title)) ? $title : "App | Welcome" ?>',
                template: './templates/template.pug',
                filename: '../../resources/views/layouts/layout.blade.php',
                minify: PRODUCTION ? { collapseWhitespace: true } : false,
            }),
            new FaviconsWebpackPlugin('./favicon.png'),

        ]
    };
};