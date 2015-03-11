/*
 * @title Dev
 * @description A bundle task that generates a development environment
 * @example (cli) gulp dev
 */


/*********************************************************************************
 1. DEPENDENCIES
 *********************************************************************************/

var browserSync = require('browser-sync');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sharedPaths = require('../shared/paths.js');


/*********************************************************************************
 2. TASK
 *********************************************************************************/

gulp.task('dev', function () {

  process.env.ENVIRONMENT_TYPE = 'dev';

  runSequence(
    'purge',
    ['sass', 'jshint', 'concat'],
    'karma',
    'minifyHtml',
    'imagemin',
    'browserSync'
  );

  gulp.watch(sharedPaths.srcIndex).on('change', browserSync.reload);

  gulp.watch(sharedPaths.srcDir + '/sass/**/*.scss', ['sass']);
  gulp.watch(sharedPaths.jshintSrc, ['jshint']);
  gulp.watch(sharedPaths.concatSrc, ['concat']);
  gulp.watch(sharedPaths.srcImages, ['imagemin']);

});
