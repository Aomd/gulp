import { src, dest } from 'gulp'

// 给文件加上hash
import rev from 'gulp-rev';
import config from '../config';
import { handleTemplate } from './handleTemplate';

/**
 *生成 js 文件 hash
 *
 */
function handleJsFileHash() {
  console.info('给js加hash')
  return src('./.config/temp_code/*.js')
    .pipe(rev())
    .pipe(dest(config.dest.js))
    .pipe(rev.manifest({
      path: `js-hash.json`,
      merge: true,
    }))
    .pipe(dest('./.config/json'))
    .on('end', function () {
      handleTemplate()
    })
}

/**
 * 生成 css 文件 hsah
 *
 */
function handleCssFileHash() {
  console.info('给css加hash')

  return src('./.config/temp_code/*.css')
    .pipe(rev())
    .pipe(dest(config.dest.css))
    .pipe(rev.manifest({
      path: `css-hash.json`,
      merge: true,
    }))
    .pipe(dest('./.config/json'))
    .on('end', function () {
      handleTemplate()
    })
}

export {
  handleJsFileHash,
  handleCssFileHash
}