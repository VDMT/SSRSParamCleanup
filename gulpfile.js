var gulp = require('gulp');
var gcopy = require('gulp-copy');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject('./.vscode/tsconfig.json');

gulp.task('Default', ['typescript', 'releaseHTML', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./src/*.ts', ['typescript']);
  gulp.watch('./*.html', ['releaseHTML']);
})

gulp.task('typescript', function() {
  var tsResult = gulp.src('./src/*.ts').pipe(tsProject());
 
  return merge([
    //tsResult.dts.pipe(gulp.dest('release/definitions')),
    tsResult.js.pipe(gulp.dest('./release'))
    ]);
});

gulp.task('releaseHTML', function() {
  gulp.src('*.html').pipe(gulp.dest('./release'));
});

