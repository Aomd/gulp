const { src, dest, parallel, watch, task } = require('gulp');

// 处理报错导致停止
var plumber = require('gulp-plumber');

import { handleCss } from './handle/handleCss';
import { handleJs } from './handle/handleJs';

// 默认为开发模式
var mode = 'dev'

for (var i = 0; i < process.argv.length; i++) {
  argFilter(i, process.argv[i], process.argv)
}


/**
 * 处理参数命令行
 *
 * @param {*} index 参数下标
 * @param {*} content 当前参数内容
 * @param {*} argvs argvs 所有参数
 */
function argFilter(index, content, argvs) {
  if (content == 'build') {
    // 压缩编译
    mode = 'build'
  } else {
    // 普通编译 不压缩
    mode = 'dev'
  }
}

// 监听
watch(['./src/**/*.js'], function (cb) {
  console.log('监听到js文件变化')
  handleJs()
  cb();
})
watch(['./src/**/*.scss'], function (cb) {
  console.log('监听到css文件变化')
  handleCss()
  cb();
})

handleCss()
handleJs()

export{
  plumber,
  mode
}

// // 处理 模板
// function handleTemplate() {

// }
// // 处理 css

// // 处理js
// function handleJs() {

// }

// // 资源压缩
// function handleGzip() {
//   // 压缩 css
//   // 压缩 js
// }

// handleCss()