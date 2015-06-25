// File: Gulpfile.js
'use strict';

var gulp                = require('gulp'),
    connect             = require('gulp-connect'),
    historyApiFallback  = require('connect-history-api-fallback'),

    // preocesa y comprime archivos de sass a css
    sass                = require('gulp-sass'),

    // inyectarán las librerías
    inject              = require('gulp-inject'),
    wiredep             = require('wiredep').stream,

    // Busca errores en el JS
    jshint              = require('gulp-jshint'),
    stylish             = require('jshint-stylish'),

    // Concatenación de ficheros JS y CSS
    gulpif              = require('gulp-if'),
    minifyCss           = require('gulp-minify-css'),
    useref              = require('gulp-useref'),
    uglify              = require('gulp-uglify'),

    // Reducir el peso de las imganes
    imagemin            = require('gulp-imagemin'),
    pngcrush            = require('imagemin-pngcrush'),

    // css que no utilizaremos
    uncss               = require('gulp-uncss');


// Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
  root: './app',
  hostname: 'localhost',
  port: 5000,
  livereload: true,
  middleware: function(connect, opt) {
      return [ historyApiFallback() ];
    }
 });
});

// procesas de sass a css
gulp.task('sass', function () {
  gulp.src('./app/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src('./app/js/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', function() {
  var sources = gulp.src(['./app/js/**/*.js','./app/css/**/*.css']);
  return gulp.src('index.html', {cwd: './app'})
  .pipe(inject(sources, {
    read: false,
    ignorePath: '/app'
  }))
  .pipe(gulp.dest('./app'));
});

// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
  .pipe(wiredep({
    directory: './app/lib'
  }))
  .pipe(gulp.dest('./app'));
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
  .pipe(connect.reload());
});

// Concatenación de ficheros JS y CSS
gulp.task('compress', function() {
  gulp.src('./app/index.html')
  .pipe(useref.assets())
  .pipe(gulpif('*.js', uglify({mangle: false })))
  .pipe(gulpif('*.css', minifyCss()))
  .pipe(gulp.dest('./dist'));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/sass/**/*.scss'], ['sass', 'inject']);
  gulp.watch(['./app/js/**/*.js'], ['jshint', 'inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});


// Servidor web en produccion
gulp.task('production-server', function() {
  connect.server({
  root: './dist',
  hostname: 'localhost',
  port: 5000,
  livereload: true,
  middleware: function(connect, opt) {
      return [ historyApiFallback() ];
    }
 });
});

// remover el CSS no utilizado
gulp.task('uncss', function() {
  gulp.src('./dist/css/style.min.css')
  .pipe(uncss({
    html: ['./app/index.html']
  }))
  .pipe(gulpif('*.css', minifyCss({
    keepSpecialComments:0,
    keepBreaks:false
  })))
  .pipe(gulp.dest('./dist/css'));
});

// Copia el contenido de los estáticos e index.html al directorio
// de producción sin tags de comentarios
gulp.task('copy', function() {
  gulp.src('./app/index.html')
  .pipe(useref())
  .pipe(gulp.dest('./dist'));
  gulp.src('./app/lib/fontawesome/fonts/**')
  .pipe(gulp.dest('./dist/fonts'));
});

// Reduce el peso de las imagenes para produccion
gulp.task('images', function() {
  gulp.src('./app/img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest('./dist/img'));
});


// Remplazar la url correcto de las fuentes en el css
// Utilizar en producción caso contrario que las url de las fuentes estén mal
var replace = require('gulp-replace');
gulp.task('font-url', function(){
  gulp.src(['./dist/css/style.min.css'])
    .pipe(replace('url(css/', 'url(../'))
    .pipe(gulp.dest('./dist/css'));
});


// por defecto en desarrollo
gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);

// para produccion
gulp.task('production', ['compress', 'images', 'copy']);

// css compress
gulp.task('csscompress', ['uncss']);
