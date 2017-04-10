var gulp = require('gulp');
var htmlsplit = require('gulp-htmlsplit');
gulp.task('foo', function() {
    gulp.src('./dist/index.html')
        .pipe(htmlsplit())
        .pipe(gulp.dest('build'));
})