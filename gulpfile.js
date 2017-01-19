const gulp = require('gulp');
const sequence = require('run-sequence');
const shell = require('gulp-shell');

require('./task/clean');
require('./task/webpack');
require('./task/minify');
require('./task/copy');

gulp.task('default', () => {
  return sequence('clean', 'copy-img', 'copy-ueditor', 'webpack-dev');
});

gulp.task('build', () => {
  return sequence('clean', 'copy-img', 'copy-ueditor', 'webpack', 'minify');
});

gulp.task('deve', shell.task([
  'node index',
]));


