'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var lint = require('gulp-eslint'); 

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js*',
        css: './src/styles/**/*.scss',
        dist: './dist',
        mainJs: './src/main.jsx',
        mainCss: './src/styles/main.scss',
        images: './src/images/**/*'
    }
};

// Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ 
            uri: config.devBaseUrl + ':' + config.port + '/'
        }));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    //browserify(config.paths.mainJs, { debug: true })
    return browserify({
            extensions: ['.js', '.jsx'],
            entries: config.paths.mainJs,
            debug: true
        })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(config.paths.mainCss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.paths.dist + '/styles'))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint())
        .pipe(lint.format());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['lint', 'js']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'lint', 'js', 'css', 'images', 'open', 'watch']);