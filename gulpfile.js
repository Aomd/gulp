'use strict';

var gulp = require('gulp');
// 编译sass
var sass = require('gulp-sass');
// 压缩css
var cssmin = require('gulp-clean-css');
// 判断
var ifElse = require('gulp-if-else');

var gulpif = require('gulp-if');
// 压缩js
var uglify = require('gulp-uglify');

var rename = require("gulp-rename");
//压缩html
var htmlmin = require('gulp-htmlmin');
// 拆分文件
var fileinclude = require('gulp-file-include');
//制作雪碧图插件
var spritesmith = require('gulp.spritesmith');
// 压缩图片
var imagemin = require('gulp-imagemin');
// 获取图片流
var buffer = require('vinyl-buffer');
// 检测错误抛出
var plumber = require('gulp-plumber');
// 重新加载
var livereload = require('gulp-livereload');
// 获取文件名
var through = require('through2');
// 获取文件名map
var sourcemaps = require('gulp-sourcemaps');
// 给文件加上hash
var rev = require('gulp-rev');
// 替换文件hash
var revCollector = require('gulp-rev-collector');
// 清空hash文件
var del = require('del');

var chinese2unicode = require('gulp-chinese2unicode');

// 合并文件
var concat = require('gulp-concat');

// 接收命令行参数
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));

var pump = require('pump');


var browserify = require('gulp-browserify');


const shell = require('gulp-shell');

//var babel = require('gulp-babel');
// 解决浏览器兼容
var autoprefixer = require('gulp-autoprefixer');


var minSwitch = false;



gulp.task('gyMinJs', function() {
    del('./static/js/md5/*.js');
    return gulp.src('./lib/js/_index.js')
    // browserify模块化
    .pipe(browserify({
        // 调试模式
        // insertGlobals : true,
        // debug : !gulp.env.production
    }))
    // .pipe(uglify())
    // 获取文件hash

    

    .pipe(gulpif(minSwitch, uglify()))

    .on('error', function (err) {
        console.log(err.toString());
    })


    .pipe(rev())


    // 输出hash文件名文件
    .pipe(gulp.dest('./static/js/md5/'))

    // 生成hash配置文件
    .pipe(rev.manifest({
        path: 'configJs.json',
        merge: true,
    }))

    // 输出hash配置文件
    .pipe(gulp.dest('./lib/config/'))

    // 完成后替换htmljs hash路径
    .on('end', function() {
        gulp.src(['./lib/config/configJs.json','./lib/config/configCss.json', './lib/html/_temp.html'])
            .pipe(revCollector())
            .pipe(rename('index.html'))
            .pipe(gulp.dest('./'))
    })
    .on('end', function() {
        gulp.src(['./lib/config/configJs.json', './lib/js/main.js'])
            .pipe(revCollector())
            .pipe(gulp.dest('./static/js/'))
    })
    
})

gulp.task('gyMinCss', function() {

    del('./static/css/md5/*.css');
    setTimeout(function() {
        return (gulp.src('./lib/css/index.scss')
        .pipe(sass())

        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))

        .pipe(gulpif(minSwitch, cssmin()))
        
        .pipe(rev())

        // 输出hash文件名文件
        .pipe(gulp.dest('./static/css/md5/'))

        // 生成hash配置文件
        .pipe(rev.manifest({
            path: 'configCss.json',
            merge: true,
        }))

        // 输出hash配置文件
        .pipe(gulp.dest('./lib/config'))

        // 完成后替换htmljs hash路径
        .on('end', function() {
            gulp.src(['./lib/config/configJs.json','./lib/config/configCss.json', './lib/html/_temp.html'])
            .pipe(revCollector())
            .pipe(rename('index.html'))
            .pipe(gulp.dest('./'))
        }))

    }, 300);
        
})

gulp.task('gyMinHtml', function() {
    return gulp.src('./lib/html/_index.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))

    .pipe(rename({
        basename: "_temp", //文件名
        extname: ".html" //扩展名
    }))

    .pipe(gulp.dest('./lib/html/'))

    // 完成后替换htmljs hash路径
    .on('end', function() {
        gulp.src(['./lib/config/configJs.json','./lib/config/configCss.json', './lib/html/_temp.html'])
            .pipe(revCollector())
            .pipe(rename('index.html'))
            .pipe(gulp.dest('./'))
    })
})


gulp.task('auto', function() {
    gulp.watch(['./lib/js/**/*.js'], ['gyMinJs'])
    gulp.watch(['./lib/html/**/*.html'], ['gyMinHtml'])
    gulp.watch(['./lib/css/**/*.scss'], ['gyMinCss'])
});
gulp.task('default',['gyMinJs','gyMinCss','gyMinHtml','auto']);


gulp.task('encode',function(){
    return gulp.src('./static/js/md5/*.js')
    .pipe(chinese2unicode())
    .pipe(gulp.dest('./static/js/md5/'))
})