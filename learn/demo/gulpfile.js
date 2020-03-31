const {src,dest,series,watch} = require('gulp'); 
const browserSync = require('browser-sync').create();
const del = require('del');
// gulp-uglify => plugins.uglify = require('gulp-uglify');
const plugins = require('gulp-load-plugins')();
// 压缩js uglifyjs
function js(cb) {
    src('js/*.js')
    // 下一个处理环节
    .pipe(plugins.uglify())
    .pipe(dest('./dist/js'))
    cb();
}
// 对scss / less 编译，压缩，输出css文件
function css(cb) {
    src('css/*.scss')
    .pipe(plugins.sass({outputStyle:'compressed'}))
    .pipe(plugins.autoprefixer({
        cascade:false,
        remove:false
    }))
    .pipe(dest('./dist/css/'))
    cb();
}
// 监听这些文件的变化

function watcher() {
    watch('js/*.js',js)
    watch('css/*.scss',css)
}
// 删除dist目录中的内容

function clean(cb) {
    del('./dist');
    cb();
}

functio
exports.scripts = js;
exports.styles = css;
exports.clean = clean;
exports.default =  series([
    clean,
    js,
    css,
    watcher
    ])