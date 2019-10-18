//处理所有的.html代码
const gulp = require("gulp");
gulp.task("copy-html",function(){
    return gulp.src("html/*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

//处理后缀.js代码的数据
gulp.task("scripts",function(){
    return gulp.src(["js/*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//处理图片
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//处理数据.json
gulp.task("data",function(){
    return gulp.src(['json/*.json',"!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//处理scss文件
const sass = require("gulp-sass");
gulp.task("scss",function(){
    return gulp.src("css/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//一次性执行多个任务
gulp.task("build",['copy-html','scripts','images','data','scss'],function(){
    console.log("项目建立成功");
})

//启动监听
gulp.task("watch",function(){
    gulp.watch("html/*.html",['copy-html']);
    gulp.watch(["js/*.js","!gulpfile.js"],["scripts"]);
    gulp.watch("images/**/*", ['images']);
    gulp.watch(['json/*.json',"!package.json"], ['data']);
    gulp.watch("css/*.scss", ['scss']);
})

//启动服务
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root: "dist",
        port: 3838,
        livereload: true
    })
})

//设置一个默认任务
gulp.task("default",['watch','server']);
