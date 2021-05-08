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