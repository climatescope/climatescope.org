var gulp = require('gulp');
var cp = require('child_process');
var runSequence = require('run-sequence');
var compass = require('gulp-compass');
var uglify = require('gulp-uglifyjs');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//-------------------------- Copy tasks --------------------------------------//
//----------------------------------------------------------------------------//

// Copy from the .tmp to _site directory.
// To reduce build times the assets are compiles at the same time as jekyll
// renders the site. Once the rendering has finished the assets are copied.
gulp.task('copy:assets', function(done) {
  return gulp.src('.tmp/assets/**')
    .pipe(gulp.dest('_site/assets'));
});

////////////////////////////////////////////////////////////////////////////////
//--------------------------- Assets tasks -----------------------------------//
//----------------------------------------------------------------------------//

gulp.task('compass', function() {
  return gulp.src('app/assets/styles/*.scss')
    .pipe(compass({
      css: '.tmp/assets/styles',
      sass: 'app/assets/styles',
      style: 'expanded',
      sourcemap: true,
      require: ['sass-css-importer'],
      bundle_exec: true
    }));
});

// Dependencies.
gulp.task('compress:deps:map', function() {
  // deps.js
  return gulp.src([
      'app/assets/scripts/vendor/map-dependencies/*.js',
      'app/assets/vendor/mapbox/mapbox.js'
    ])
    .pipe(plumber())
    .pipe(uglify('map-dependencies.min.js'))
    .pipe(gulp.dest('.tmp/assets/scripts/vendor'));
});

gulp.task('compress:deps:angular', function() {
  // deps.js
  return gulp.src([
      'app/assets/scripts/vendor/angular.min.js',
      'app/assets/scripts/vendor/angular-route.min.js'
    ])
    .pipe(plumber())
    .pipe(uglify('angular-deps.min.js'))
    .pipe(gulp.dest('.tmp/assets/scripts/vendor'));
});

// Loose dependencies
// They need to be loaded individually
gulp.task('copy:deps', function(done) {
  return gulp.src([
    'app/assets/scripts/vendor/modernizr.custom.2.8.3.js',
    'app/assets/scripts/vendor/selectivizr-1.0.3b.js',
    'app/assets/scripts/vendor/respond.min.js',
    'app/assets/scripts/vendor/rem.min.js',
    'app/assets/scripts/vendor/jquery-1.11.0.min.js',
    'app/assets/scripts/vendor/jquery-2.1.0.min.js',
    'app/assets/scripts/vendor/boxsizing.htc'
    ])
    .pipe(gulp.dest('.tmp/assets/scripts/vendor'));
});
gulp.task('copy:deps:imgs', function(done) {
  return gulp.src([
    'app/assets/vendor/mapbox/images/*.{png,svg,jpg}'
    ])
    .pipe(gulp.dest('.tmp/assets/styles/images'));
});
// Aggregate the tasks above.
gulp.task('dependencies', function(done) {
  runSequence(['compress:deps:map', 'compress:deps:angular', 'copy:deps', 'copy:deps:imgs'], done);
});

gulp.task('compress:main', function() {
  // main.min.js
  var task = gulp.src([
      'app/assets/scripts/*.js',
      'app/assets/scripts/angular/**/*.js',
      'app/assets/vendor/noUiSlider/jquery.nouislider.min.js',
      'app/assets/scripts/vendor/jquery.once.min.js',
      'app/assets/vendor/flexslider/jquery.flexslider.js',
      'app/assets/scripts/vendor/d3.v3.min.js'
    ])
    .pipe(plumber());

    if (environment == 'development') {
      task = task.pipe(concat('main.min.js'));
    }
    else {
      task = task.pipe(uglify('main.min.js', {
        outSourceMap: true,
        mangle: false
      }));
    }

    return task.pipe(gulp.dest('.tmp/assets/scripts'));
});


// Build the jekyll website.
gulp.task('jekyll', function (done) {
  var args = ['exec', 'jekyll', 'build'];

  switch (environment) {
    case 'development':
      args.push('--config=_config.yml,_config-dev.yml');
    break;
    case 'stage':
      args.push('--config=_config.yml,_config-stage.yml');
    break;
    case 'production':
      args.push('--config=_config.yml');
    break;
  }

  return cp.spawn('bundle', args, {stdio: 'inherit'})
    .on('close', done);
});

// Build the jekyll website.
// Reload all the browsers.
gulp.task('jekyll:rebuild', ['jekyll'], function () {
  browserSync.reload();
});

// Main build task
// Builds the site. Destination --> _site
gulp.task('build', function(done) {
  runSequence(['jekyll', 'compress:main', 'dependencies', 'compass'], ['copy:assets'], done);
});

// Default task.
gulp.task('default', function(done) {
  runSequence('build', done);
});

gulp.task('serve', ['build'], function () {
  browserSync({
    port: 3000,
    server: {
      baseDir: ['.tmp', '_site']
    }
  });

  gulp.watch(['./app/assets/fonts/**/*', './app/assets/images/**/*'], function() {
    runSequence('jekyll', browserReload);
  });

  gulp.watch('app/assets/styles/**/*.scss', function() {
    runSequence('compass', browserReload);
  });

  gulp.watch(['./app/assets/scripts/**/*.js', '!./app/assets/scripts/vendor/**/*'], function() {
    runSequence('compress:main', browserReload);
  });

  gulp.watch(['app/assets/scripts/vendor/**/*'], function() {
    runSequence('dependencies', browserReload);
  });

  gulp.watch(['app/**/*.html', 'app/**/*.md', 'app/**/*.json', 'app/**/*.geojson', '_config*'], function() {
    runSequence('jekyll', browserReload);
  });

});

var shouldReload = true;
gulp.task('no-reload', function(done) {
  shouldReload = false;
  runSequence('serve', done);
});

var environment = 'development';
gulp.task('prod', function(done) {
  environment = 'production';
  runSequence('clean', 'build', done);
});
gulp.task('stage', function(done) {
  environment = 'stage';
  runSequence('clean', 'build', done);
});

// Removes jekyll's _site folder
gulp.task('clean', function() {
  return gulp.src(['_site', '.tmp'], {read: false})
    .pipe(clean());
});

////////////////////////////////////////////////////////////////////////////////
//------------------------- Helper functions ---------------------------------//
//----------------------------------------------------------------------------//

function browserReload() {
  if (shouldReload) {
    browserSync.reload();
  }
}