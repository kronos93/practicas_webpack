const gulp = require('gulp');
const webpack = require('webpack');
const { Compiler } = require('webpack');
const config = require('./webpack.config.js');
const gutil = require('gulp-util');
gulp.task('default', function() {
    /*webpack([config], (err, stats) => {
        process.stdout.write(stats.toString() + "\n");
    });*/
    /*webpack(config).run();*/
    let compiler = webpack(config);
    /*compiler.plugin('optimize-modules', function() {
        //webpack is begining the optimization phase
        // no arguments
    });*/
    compiler.plugin('compilation', (compilation) => compilation.bail = true);
    compiler.run(function(err, stats) {
        gutil.log(stats.toString());
    });
});

/*
function onBuild(done) {

    return function(err, stats) {
        const compilation = stats.compilation;
        //if (err) {} else {
        process.stdout.write(stats.toString() + "\n");
        done(compilation);
        //}

    };
}*/