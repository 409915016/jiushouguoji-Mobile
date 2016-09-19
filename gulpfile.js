var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create(),
    cleancss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');


var browser_config = {
    baseDir: 'dist',
    watchFiles: ['dist/*.html', 'dist/css/*.css', 'dist/js/*.js']
};
gulp.task('browser-sync', ['testLess', 'autoprefixer'], function () {
    browserSync.init({
        files: browser_config.watchFiles,
        server: {
            baseDir: browser_config.baseDir
        }
    });

    gulp.watch('src/less/style.less', ['testLess']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('testLess', function () {
    gulp.src('src/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('src/css/style.css')
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: true
        }))
        .pipe(gulp.dest('dist/css'));
});



gulp.task('default', ['testLess', 'browser-sync']);