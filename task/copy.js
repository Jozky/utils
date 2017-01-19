var gulp = require('gulp');
gulp.task('copy-template', function () {
  return gulp.src([
    './src/template/**/*.html'
  ], {
    base: './src'
  })
    .pipe(gulp.dest('./src/build/'));
});
gulp.task('copy-img', function () {
  return gulp.src([
    './src/static/img/**/*.{ico,jpg,png,gif}'
  ], {
    base: './src'
  })
    .pipe(gulp.dest('./src/build/'));
});
gulp.task('copy-ueditor', function () {
  return gulp.src([
    './src/static/ueditor/**/*'
  ], {
    base: './src'
  })
    .pipe(gulp.dest('./src/build/'));
});