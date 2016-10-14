var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps');

var autoprefix = new LessPluginAutoPrefix({
    browsers: ["last 10 versions"]
});

var browser_config = {
    baseDir: 'dist',
    watchFiles: ['dist/*.html', 'dist/css/*.css', 'dist/js/*.js']
};

gulp.task('testLess', function () {
    gulp.src('src/less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css', function () {
    return gulp.src('dist/css/style.css')
        .pipe(cleanCSS({
            advanced: false,
            compatibility: 'ie8',
            output: 'style-min',
            keepSpecialComments: '*',
            keepBreaks: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('browser-sync', ['testLess', 'minify-css'], function () {
    browserSync.init({
        files: browser_config.watchFiles,
        server: {
            baseDir: browser_config.baseDir
        }
    });

    gulp.watch('src/less/*.less', ['testLess']);
    gulp.watch('dist/css/*.css', ['minify-css']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});



gulp.task('default', ['testLess', 'minify-css', 'browser-sync']);