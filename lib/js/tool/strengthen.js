// 加强

// 重写
var t = require('./tool');

// window
var w = t.w;

// document
var d = t.d;

// documentElement
var el = t.el;



// 增加数组is方法
Array.prototype.is = function(num){
    for(var i in this){
        if(num == this[i]){
            return true;
        }else{
            return false;
        }
    }
}

// 增强 Math unicode编码
isFun(w.Math.ENunicode,'ENunicode');
w.Math.ENunicode = function(str){
    if(typeof(str) === 'string'){
        var s = '';
        for(var i = 0; i < str.length; i++){
            s+= '\\u';
            s+= ('0000'+str.charCodeAt(i).toString(16)).slice(-4);
        }
        return s;
    }else{
        // 不是字符串
        throw new Error('参数不是字符串');
    }
}


// 添加序列化js对象保存在 localStorage
isFun(w.cache,'cache');
w.cache = {
    o:localStorage,
    get:function(index){
        try {
            return JSON.parse(this.o.getItem(index));
        } catch (error) {
            throw new Error(error);
        }
    },
    set:function(index,val){
        if(typeof(val) === 'object'){
            this.o.setItem(index,JSON.stringify(val));
        }else{
            throw new Error('不是js对象');
        }
    },
    del:function(index){
        this.o.removeItem(index)
    }
}


isFun(w.Math.accAdd,'Math.accAdd');

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/

w.Math.accAdd = function(arg1,arg2){
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}


isFun(w.Math.accSub,'Math.accSub');
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1减去arg2的精确结果
 **/
w.Math.accSub = function (arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

isFun(w.Math.accMul,'Math.accMul');
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
w.Math.accMul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

isFun(w.Math.accDiv,'Math.accDiv');
/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
w.Math.accDiv = function (arg1, arg2){
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
// 全屏
w.screen.openFullScreen = function(){
    d[el].requestFullscreen 
    ? d[el].requestFullscreen() 
    : d[el].msRequestFullscreen 
    ? d[el].msRequestFullscreen() 
    : d[el].mozRequestFullScreen 
    ? d[el].mozRequestFullScreen() 
    : d[el].webkitRequestFullscreen && d[el].webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    log('进入全屏')
}
w.screen.closeFullScreen = function(){
   if(this.isCloseFullScreen()){
    return d.exitFullscreen 
    ? d.exitFullscreen() 
    : d.msExitFullscreen 
    ? d.msExitFullscreen()
    : d.mozCancelFullScreen 
    ? d.mozCancelFullScreen() 
    :d.webkitExitFullscreen && d.webkitExitFullscreen() 
   }
}
w.screen.isFullScreen = function(){
    // 判断是否全屏
    if(d.fullscreenElement||d.webkitFullscreenElement||d.mozFullScreenElement||d.msFullscreenElement){
        // 全屏
        return true;
    }else{
        // 不是全屏
        return false;
    }    
}



// jsAop

w.funAop = {

}
Function.prototype.after = function(o){
    if(funAop[this.name+'after']){
        funAop[this.name+'after'].push(o);
    }else{
        funAop[this.name+'after'] = [];
        funAop[this.name+'after'].push(o);
    }
    return this;
}
Function.prototype.before = function(o){
    if(funAop[this.name+'before']){
        funAop[this.name+'before'].push(o);
    }else{
        funAop[this.name+'before'] = [];
        funAop[this.name+'before'].push(o);
    }
    return this;
}
Function.prototype.run = function(){
    for(var i in funAop[this.name+'after']){
        funAop[this.name+'after'][i]();
    }
    
    this()
    
    for(var i in funAop[this.name+'before']){
        funAop[this.name+'before'][i]();
    }
}
