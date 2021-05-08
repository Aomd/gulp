import { mode, plumber } from "../handle"
import { src, dest } from 'gulp'

// 编译sass
import sass from 'gulp-sass'

import gulpif from 'gulp-if'

import minifyCSS from 'gulp-csso'

import compiler from 'sass'

import del from 'del';

sass.compiler = compiler;
// 给css添加前缀
import autoprefixer from 'gulp-autoprefixer';
import config from "../config";
import { handleCssFileHash } from "./handleFileHash"

function handleCss() {

  console.info('清理 css')
  del('./config/temp/*.css')
  del(`${config.dest.css}*.css`)


  console.info('开始编译scss')
  return src(config.src.css)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(mode == 'build', minifyCSS()))
    .pipe(dest('./.config/temp_code'))
    .on('error', function (error) {
      console.error(error)
    })
    .on('end',function(){
      // 给文件生成 hash
      handleCssFileHash()
    })


}
export {
  handleCss
}