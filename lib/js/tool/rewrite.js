// 重写
var t = require('./tool');

// window
var w = t.w;

// 重写alert
w.alert = function(n){
    try{
        console.log("alert: "+n)
    }catch(r){
        throw new Error(r);
    }
};