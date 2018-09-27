var w = window;
var d = document;
var el = 'documentElement';
module.exports = {
    w : w,
    d : d,
    el : el
}
if(w.isFun){
    throw  new Error(w.isFun+'已经被占用');
}

w.isFun = function(attr,str){
    if(attr){
        throw  new Error(str+'已经被占用');
    }
}
// 简化
require('./mini');

// 重写
require('./rewrite');

// 增强
require('./strengthen');

// 工具函数
require('./toolFun');