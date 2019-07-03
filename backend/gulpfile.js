const gulp = require('gulp');
const clean = require('gulp-clean');
const gutil = require('gulp-util');
const check = require('gulp-check');
const es = require('event-stream');
const ts = require('gulp-typescript');
const sizereport = require('gulp-sizereport');

// Limpa as pastas de js e dist
gulp.task('clean', function limparJS() {
  return gulp.src(['./js'], {
    read: false
  }).pipe(clean({allowEmpty: true}));
});

// Compila o TS para JS
gulp.task('build', gulp.series('clean', () => {
  const tsProject = ts.createProject('tsconfig.json');
  return es.merge([
    tsProject.src().pipe(tsProject()).js,
    gulp.src(['!./src/**/*.ts', './src/**/*'])
  ])
    // .pipe(check(/(console\.(log|info|error|trace))|debugger |junda/)).on('error', err => {
    //   gutil.log(gutil.colors.red(err));
    //   process.exit(-1);
    // })
    .pipe(sizereport())
    .pipe(gulp.dest('./js/'));
}));

