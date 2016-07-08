/**
  DrEd.com Product review
  Copyright (c) 2016 by andreasonny83. All Rights Reserved.

  This code may only be used under the MIT style license.

  MIT license: https://andreasonny.mit-license.org/@2016/
*/

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var openURL = require('open');
var wiredep = require('wiredep').stream;
var path = require('path');
var config = require('./gulp/config.js');
var Server = require('karma').Server;

var args = require('minimist')(process.argv.slice(2));

// Replace '/' with your production base URL
//
// eg. setting baseUrl to '/subdomain/' will write your _build/index.html like this:
// <head><base href="/subdomain/">...
// The default value is set to '/'
//
// for more information: https://docs.angularjs.org/guide/$location
var baseUrl = args.base || '/';

gulp.task('open', function() {
  openURL('http://localhost:9000/');
});

gulp.task('start:server', ['open'], function() {
  $.connect.server({
    root: [config.src, config.tmp],
    port: 9000,
    livereload: true,
    middleware: function(connect) {
      return [connect()
        .use('/bower_components', connect.static('bower_components'))
      ];
    }
  });
});

gulp.task('build:serve', function() {
  openURL('http://localhost:9001/');

  $.connect.server({
    root: [config.dist],
    port: 9001,
    livereload: true
  });
});

// reload all Browsers
gulp.task('reload', function() {
  gulp
  .src(config.src + '/index.html')
  .pipe($.connect.reload());
});

// optimize images
gulp.task('images', function() {
  return gulp
    .src(config.src + '/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dist + '/images'))
    .pipe($.size({title: 'images'}));
});

// copy fonts
gulp.task('fonts', function() {
  gulp
    .src([config.src + '/fonts/**/*'])
    .pipe(gulp.dest(config.dist + '/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// delete build folder
gulp.task('clean', function() {
  del([
    config.tmp,
    config.dist
  ], {
    dot: true
  });
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  return gulp
    .src(config.src + '/sass/main.scss')
    .pipe($.sass({
      outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe(gulp.dest(config.tmp + '/styles'))
    .pipe($.connect.reload({
      stream: true
    }))
    .pipe($.notify({
      message: 'Styles task complete'
    }))
    .pipe($.size({title: 'sass'}));
});

// SASS Build task
gulp.task('sass:build', function() {
  return gulp
    .src(config.src + '/sass/**/*.scss')
    // .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.cssnano({
      autoprefixer: {browsers: config.autoprefixer, add: true},
      safe: true
    }))
    // .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.tmp + '/styles'))
    .pipe($.size({title: 'sass'}));
});

gulp.task('scripts', function() {
  return gulp
    .src([
      config.src + '/app/**/*.js',
      '!**/test/**/*'
    ])
    .pipe($.connect.reload());
});

// Move all script files in the .temp is required by usemin
// in order to find all the source scripts in one place
gulp.task('copy:scripts', function() {
  gulp
    .src([config.src + '/app/**/*'])
    .pipe(gulp.dest(config.tmp + '/app'));
});

gulp.task('fonts', function() {
  gulp
    .src(['bower_components/font-awesome/fonts/**/*'])
    .pipe(gulp.dest(config.dist + '/fonts'));
});

// Copy the root files from your src folder inside your _build one
gulp.task('copy:root', function() {
  gulp
    .src([
      config.src + '/.htaccess',
      config.src + '/404.html',
      config.src + '/browserconfig.xml',
      config.src + '/favicon.ico',
      config.src + '/manifest.json',
      config.src + '/manifest.webapp',
      config.src + '/robots.txt'
    ], {
      dot: true
    })
    .pipe(gulp.dest(config.dist))
    .pipe($.size({title: 'copy'}));
});

gulp.task('wiredep', function() {
  return gulp
  .src(config.src + '/index.html')
  .pipe(wiredep())
  .pipe(gulp.dest(config.src));
});

gulp.task('usemin', ['wiredep'], function() {
  return gulp
    .src(config.src + '/index.html')
    .pipe(gulp.dest(config.dist))
    .pipe($.htmlReplace({
      baseUrl: '<base href="' + baseUrl + '">',
      templates: '<script src="app/templates.js"></script>'
    }))
    .pipe(gulp.dest('_build/'))
    .pipe($.usemin({
      css: ['concat', $.cssnano({
        autoprefixer: {browsers: config.autoprefixer, add: true}
      })],
      main: [$.uglify(), 'concat']
    }))
    .pipe(gulp.dest(config.dist));
});

// minify HTML
gulp.task('htmlmin', function() {
  return gulp
    .src('_build/index.html')
    .pipe($.htmlmin({
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      removeTagWhitespace: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('_build/'));
});

// make a templateCache module from all HTML files
gulp.task('templates', function() {
  return gulp
    .src('src/app/**/*.html')
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache({
      module: 'app',
      root: 'app'
    }))
    .pipe(gulp.dest('.tmp/app'));
});

/**
 * This task will build your source project in a browser & then use Gulp to watch files.
 * When a file is changed, The browser page is automatically refreshed.
 */
gulp.task('serve', ['clean'], function() {
  runSequence(
    'start:server',
    'sass',
    'wiredep',
    function() {
      gulp.watch('src/**/*.html', ['reload']);
      gulp.watch('src/app/**/*.js', ['scripts']);
      gulp.watch('src/sass/**/*.scss', ['sass']);
    }
  );
});

/**
 * Build a production version
 *
 * @param  {Function} cb    Call back function
 * @param  {String}   base  Set a default base url.
 */
gulp.task('build', ['clean'], function(cb) {
  runSequence(
    ['images', 'templates', 'copy:scripts', 'copy:root'],
    ['sass:build', 'fonts'],
    'usemin',
    'htmlmin',
    cb
  );
});

gulp.task('default', ['build']);

/**
 * Run tests once and exit
 */
gulp.task('test', function(done) {
  new Server({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true
  }, done).start();
});
