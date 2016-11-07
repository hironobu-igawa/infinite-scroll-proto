import gulp from 'gulp';
import runSequence from 'run-sequence';

import webserver from 'gulp-webserver';

import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

import less from 'gulp-less';

import concat from 'gulp-concat';
import filter from 'gulp-filter';
import clean from 'gulp-clean';

gulp.task('default', ['deploy']);

gulp.task('deploy', (cb) => {
  return runSequence('deploy-api', 'deploy-client', cb);
});

gulp.task('deploy-api', ['build-api'], () => {
  require('./app/api/app').start();
});

gulp.task('build-api', (cb) => {
  return runSequence(
    'build-api-clean',
    'build-api-scripts',
    cb
  );
});

gulp.task('build-api-clean', () => {
  return gulp.src('app/api')
    .pipe(clean());
});

gulp.task('build-api-scripts', () => {
  return gulp.src('src/api/scripts/**/*.js')
    .pipe(gulp.dest('app/api'));
});

gulp.task('deploy-client', ['build-client', 'watch-client'], () => {
  return gulp.src('app/client')
    .pipe(webserver({
      port: 3000,
      open: 'http://localhost:3000/',
      livereload: true
    }));
});

gulp.task('build-client', (cb) => {
  return runSequence(
    'build-client-clean',
    [
      'build-client-scripts',
      'build-client-styles',
      'build-client-views',
      'build-client-resources',
      'build-client-libs'
    ],
    cb
  );
});

gulp.task('build-client-clean', () => {
  return gulp.src('app/client')
    .pipe(clean());
});

gulp.task('build-client-scripts', () => {
  return gulp.src(['src/client/scripts/module.js', 'src/client/scripts/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/client'));
});

gulp.task('build-client-styles', () => {
  return gulp.src('src/client/styles/**/*.less')
    .pipe(filter(['src/client/styles/**/*', '!src/client/styles/**/_*.less']))
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('app/client'));
});

gulp.task('build-client-views', () => {
  return gulp.src('src/client/views/**/*.html')
    .pipe(gulp.dest('app/client'));
});

gulp.task('build-client-resources', () => {
  return gulp.src(['src/client/resources/**/*'])
    .pipe(gulp.dest('app/client'));
});

gulp.task('build-client-libs', () => {
  const libs = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
  ];

  return gulp.src(libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('app/client'));
});

gulp.task('watch-client', () => {
  gulp.watch('src/client/scripts/**/*.js', ['build-client-scripts']);
  gulp.watch('src/client/styles/**/*.less', ['build-client-styles']);
  gulp.watch(['src/client/index.html','src/views/**/*.html'], ['build-client-views']);
  gulp.watch('src/client/resources/**/*', ['build-client-resources']);
});
