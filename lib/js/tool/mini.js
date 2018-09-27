// 简化

var t = require('./tool');

// window
var w = t.w;

// 简化 console.log
isFun(w.log,'log');
w.log = console.log;

// 可以混淆
// w.log = function(str){
//     console.log(str)
// }