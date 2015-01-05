var gulp = require('gulp');

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jasmine = require('gulp-jasmine');

var jsPaths = {
  path: ['server/**/*.js', 'client/js/**/*.js', 'tessel/**/*.js', 'mobile/www/js/**/*.js', 'test/**/*.js']
};

// checks js files with jshint
gulp.task('lint', function() {
  // return gulp.src('server/**/*.js')
  return gulp.src(jsPaths.path)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// checks js files for jscs styles
gulp.task('checkStyle', function() {
  // return gulp.src('./**/*.js')
  return gulp.src(jsPaths.path)
    .pipe(jscs({
      preset: 'google',
      requireCamelCaseOrUpperCaseIdentifiers: null,
      maximumLineLength: { value: 100 }
    }));
});

// watch files for changes
// gulp.task('watch', function() {
//   gulp.watch('src/**/*.js', ['lint', 'checkStyle']);
// });

gulp.task('default', ['lint', 'checkStyle']);

