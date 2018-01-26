var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var minifyCSS = require('gulp-minify-css');
var imageMin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var rename=require('gulp-rename');   //文件重命名
var gulpSequence = require('gulp-sequence');// 处理文件的顺序问题
var del =require('del');//删除用

gulp.task('clean',function() {
    return del(['./jxcs/*'])// 清空这两个目录下的文件
});
gulp.task('minijs', function (cb) {
    pump([
            gulp.src('lib/**/*.js'),
            uglify(),
            rename({
                extname:'.min.js'}),
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
gulp.task('default',gulpSequence('clean',['minicss', 'minijs', 'miniimage', 'minihtml','json']));// 数组内的并行运行 参数按前后顺序执行
