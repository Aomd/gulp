# 编译 `js` `scss`

## 启动 

项目根目录输入 `node ./main`

普通编译 `node ./main`
压缩编译 `node ./main build`

## 配置文件
```
// config.js
export default {
  // 开启map
  sourcemaps: false,
  // 资源路径
  src: {
    css: [
      './src/scss/index.scss',
      './src/scss/main.scss'
    ],
    js: ['./src/js/index.js'],
    template: ['./src/template/test.txt'],

  },
  // 输出资源
  dest: {
    // 文件夹路劲后面 需要带上 '/'
    css: './dest/css/',
    js: './dest/js/',
    template: './dest/template/'
  }
}
```

