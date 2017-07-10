const gulp = require('gulp');
const watch = require('gulp-watch');
const htmlsplit = require('gulp-htmlsplit');

/*gulp.task('split-html', function(done) {
    return watch('./dist/*.html', { ignoreInitial: false })
        //gulp.src('./dist/index.html')
        .pipe(htmlsplit())
        .pipe(gulp.dest('dist'));
});*/

gulp.task('default', function() {
    gulp.src('./dist/*.html')
        .pipe(htmlsplit())
        .pipe(gulp.dest('dist'));
});