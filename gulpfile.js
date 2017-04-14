var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');
var gulpSequence = require('gulp-sequence');
var compress = require('gulp-compress')
var options = {
    src: './src',
    dest: './dist'
};

require('gulp-compress')(gulp, options);

gulp.task('default', gulpSequence('clean', 'imagemin', 'compress'));

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('imagemin', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);


