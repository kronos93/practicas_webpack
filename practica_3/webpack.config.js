const { resolve } = require('path');

console.log('process.env.NODE_ENV');

const config = {
    entry: './src/script.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    stats: {
        colors: true,
    }
};
module.exports = function(env) { console.log('process.env.NODE_ENV'); return config; };