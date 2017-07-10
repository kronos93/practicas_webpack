/*var gulp = require('gulp');
var htmlsplit = require('gulp-htmlsplit');
gulp.task('foo', function() {
    gulp.src('./dist/index.html')
        .pipe(htmlsplit())
        .pipe(gulp.dest('build'));
})*/
const gulp = require('gulp');
const watch = require('gulp-watch');
const htmlsplit = require('gulp-htmlsplit');
const webpack = require('webpack');
//const webpackConfig = require('./webpack.config.js');
//const compiler = webpack(webpackConfig);


gulp.task('default', function(done) {
    return watch('./dist/*.html', { ignoreInitial: false })
        //gulp.src('./dist/index.html')
        .pipe(htmlsplit())
        .pipe(gulp.dest('dist'));
});