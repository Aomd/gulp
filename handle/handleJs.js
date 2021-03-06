import { dest, src } from 'gulp'


import del from 'del';

import config from "../config"
import { mode, plumber } from "../handle";

// 文件流
import source from 'vinyl-source-stream';

// buffer流
import buffer from 'vinyl-buffer';

// 组合es5 require
import browserify from 'browserify';

// 编译es6
import babel from 'gulp-babel';


import gulpif from 'gulp-if'

// 压缩js
import uglify from 'gulp-uglify';
import { handleJsFileHash } from './handleFileHash';

// uglify选项
var uglifyOption = {
  mangle: {
    // 压缩函数名称
    toplevel: true,
    // 白名单
    // reserved: [''],
  }
}

function handleJs() {

  console.info('清理 js')
  del('./config/temp/*.js')
  del(`${config.dest.js}*.js`)

  config.src.js.map(function (path) {
    var name = path.match(/\/([^\/^.]+)\.[^\/]*$/)[1];
    console.info('开始处理js')



    var b = browserify({
      entries: path,
      debug: true
    });
    // 在 bundle 之前处理 es6 转 es5
    b.transform('babelify', {
      presets: ["@babel/preset-env"],
      // map
      sourceMapsAbsolute: mode != 'build'
    })
      .bundle()
      .pipe(plumber())
      .pipe(source(`${name}.js`))
      .pipe(buffer())
      // .pipe(babel({
      //   presets: ['@babel/env']
      // }))
      .pipe(gulpif(mode == 'build', uglify(uglifyOption)))
      .pipe(dest('./.config/temp_code'))
      .on('error', function (error) {
        console.error(error)
      })
      .on('end', function () {
        // 给文件生成 hash
        handleJsFileHash()
      })

  })
}


export {
  handleJs
}
