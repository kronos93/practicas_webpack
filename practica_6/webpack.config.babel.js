import webpack from 'webpack';
import { resolve } from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';

let config = {
    context: resolve(__dirname, 'resources/assets/src'),
    entry: './js/script.js',
    output: {
        path: resolve(__dirname, './public/dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin('./public/dist/*.*'),
    ]
};

export default config;