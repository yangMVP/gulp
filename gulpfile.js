var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var minifyCSS = require('gulp-minify-css');
var imageMin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
gulp.task('minijs', function (cb) {
    pump([
            gulp.src('lib/**/*.js'),
            uglify(),
            gulp.dest('./')
        ],
        cb
    );
});

gulp.task('minicss', function () {
    gulp.src('lib/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./'))
});
gulp.task('miniimage', function () {
    gulp.src(['lib/**/*.png', 'lib/**/*.gif'])
        .pipe(imageMin({progressive: true}))
        .pipe(gulp.dest('./'))
});
gulp.task('minihtml', function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        minfyJS: true,//压缩JS
        minfyCss: true,//压缩CSS
    };
    gulp.src('lib/**/*.html')
    //压缩html
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./'))
});
gulp.task('json', function () {
    gulp.src('lib/**/*.json').pipe(gulp.dest('./'))
});
gulp.task('default', function () {
    gulp.start('minicss', 'minijs', 'miniimage', 'minihtml','json');
});
