const { src, dest, watch, parallel, series } = require('gulp');

const include = require('gulp-include');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

const styleList = [
  'node_modules/@fancyapps/ui/dist/fancybox/fancybox.css',
  'app/scss/style.scss',
];
const scriptList = [
  'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
  'app/js/main.js',
];

function pages(){
  return src('app/pages/*.html')
    .pipe(include({
      includePaths: 'app/components'
    }))
    .pipe(dest('app'))
}


function styles() {
  return src(styleList)
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src(scriptList)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src(['app/images/*.*'])
    .pipe(newer('app/images'))
    .pipe(imagemin())

    .pipe(dest('app/images'))
}

function watching() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  });
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/images'], images);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/components/*', 'app/pages/*'], pages);
  watch(['app/**/*.html']).on('change', browserSync.reload)
}


function cleanDist() {
  return src('dist')
    .pipe(clean())
}

function building() {
  return src([
    'app/css/style.min.css',
    'app/images/*.*',
    'app/js/main.min.js',
    'app/**/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

exports.pages = pages;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.building = building;

exports.build = series(cleanDist, building)
exports.default = parallel(styles, images, scripts, pages, watching)