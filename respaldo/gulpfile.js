const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const webpack_config = require('./webpack.config.js');

gulp.task('default', function(done) {
    webpack(webpack_config).run(onBuild(done));
});

function onBuild(done) {
    return function(err, stats) {
        if (err) {
            gutil.log('Error', err);
            if (done) {
                done();
            }
        } else {
            console.log(stats.toString());
            Object.keys(stats.compilation.assets).forEach(function(key) {
                gutil.log('Webpack: output ', gutil.colors.green(key));
            });
            gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.compilation.name));
            if (done) {
                done();
            }
        }
    };
}