const gulp = require('gulp');
const webpack = require('webpack');
const { Compiler } = require('webpack');

const gutil = require('gulp-util');

const config = require('./webpack.config');
let compiler = webpack(config);
gulp.task('default', function() {
    compiler.run(function(err, stats) {
        gutil.log(stats.toString({
            colors: true, // Añadir colores en la consola
        }));
    });
});