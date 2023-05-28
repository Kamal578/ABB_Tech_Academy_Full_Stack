const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const minifyCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

// Define source and destination paths
const paths = {
  src: {
    styles: 'src/scss/**/*.scss',
    scripts: 'src/scripts/*.js',
    images: 'src/img/**/*',
  },
  dist: {
    base: 'dist/',
    styles: 'dist/css',
    scripts: 'dist/js',
    images: 'dist/img',
  },
  html: './*.html',
};

// Task to compile Sass, concatenate, minify, and autoprefix CSS
gulp.task('styles', function () {
  return gulp
    .src(paths.src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(browserSync.stream());
});

// Task to optimize images
gulp.task('img', function () {
  return gulp
    .src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));
});

// Task to concatenate, uglify, and move JavaScript files
gulp.task('scripts', function () {
  return gulp
    .src(paths.src.scripts)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.scripts));
});

// Task to clean the 'dist' directory
gulp.task('clean', function () {
  return gulp.src(paths.dist.base, { allowEmpty: true, read: false }).pipe(clean());
});

// Task for development mode
gulp.task('dev', gulp.series('styles', 'scripts', 'img', function () {
  browserSync.init({
    server: {
      baseDir: '.',
    },
  });

  gulp.watch(paths.src.scripts, gulp.series('scripts')).on('change', browserSync.reload);
  gulp.watch(paths.src.styles, gulp.series('styles')).on('change', browserSync.reload);
  gulp.watch(paths.src.images, gulp.series('img')).on('change', browserSync.reload);
}));

// Task to build the project (including HTML files)
gulp.task('build', gulp.series('clean', 'styles', 'scripts', function () {
  return gulp.src(paths.html).pipe(gulp.dest(paths.dist.base));
}));

// Default task
gulp.task('default', gulp.series('dev'));

