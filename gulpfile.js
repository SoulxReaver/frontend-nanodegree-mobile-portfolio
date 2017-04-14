var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var gulpSequence = require('gulp-sequence');

var paths = {
  scripts: ['js/**/*.js'],
  images: 'img/**/*'
};

gulp.task('default', gulpSequence('clean', 'scripts', 'htmlclean', 'minify-css', 'imagemin'));
// Not all tasks need to use streams 
// A gulpfile is just another node program and you can use any package available on npm 
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  return del(['dist']);
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts) 
  // with sourcemaps all the way down 
  return gulp.src(paths.scripts)
      .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('htmlclean', function() {
  return gulp.src('index.html')
    .pipe(htmlclean({
        protect: /<\!--%fooTemplate\b.*?%-->/g,
        edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
      }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', () =>
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);
