import config from "../config"

import { src, dest } from 'gulp'
import { mode } from "../handle";

// 开启资源gzip
import gzip from 'gulp-gzip';
import del from "del";

// 替换文件hash
const revCollector = require('gulp-rev-collector');

function handleTemplate() {

  console.log('替换模板hash')
  var item = src(['./.config/json/*.json'].concat(config.src.template))
    .pipe(revCollector())
    .pipe(dest(config.dest.template))

  // 是build 就加 zip
  if (mode == 'build') {
    // 清理css gzip
    del(`${config.dest.css}*.css.zip`)
    console.log('生成 css gzip文件')
    src([`${config.dest.css}*.css`])
      .pipe(gzip({ extension: 'zip' }))
      .pipe(dest(config.dest.css))

    del(`${config.dest.js}*.js.zip`)
    console.log('生成 js gzip文件')
    src([`${config.dest.js}*.js`])
      .pipe(gzip({ extension: 'zip' }))
      .pipe(dest(config.dest.js))

  }
  return item
}

export {
  handleTemplate
}
