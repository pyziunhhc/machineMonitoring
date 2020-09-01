const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber');


gulp.task('styles', function () {
    return gulp.src('./styles.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync())
        .pipe(autoprefixer({
            Browserlist: ['last 5 version']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../public/stylesheets'))
});


gulp.task('watch', function () {
    gulp.watch('./**/*.scss', gulp.series('styles'));
})