const gulp = require('gulp');
const htmlsplit = require('gulp-htmlsplit');

function GulpWebpackSplitHtmlPlugin() {

}

GulpWebpackSplitHtmlPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', stats => {
        gulp.src('./dist/template/*.html')
            .pipe(htmlsplit())
            .pipe(gulp.dest('./dist/template'));

    });
    console.log('Termino la ejecución del plugin GulpWebpackSplitHtmlPlugin');
};

module.exports = GulpWebpackSplitHtmlPlugin;