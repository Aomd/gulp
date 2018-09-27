// 重写
var t = require('./tool');

// window
var w = t.w;

w.showTime = function(arg,b){
    var b = b || false;
    var t = new Date();
    var strNum = ['零','一','二','三','四','五','六','七','八','九'];
    
    var YY = t.getFullYear().toString();
    var MM = (t.getMonth() + 1).toString();
    var DD = t.getDate().toString();
    var HH = t.getHours().toString();
    var mm = t.getMinutes() < 10? '0'+ t.getMinutes().toString() : t.getMinutes().toString();
    var SS = t.getSeconds() < 10? '0'+ t.getSeconds().toString() : t.getSeconds().toString();
    if(b){
        // 年
        var str = '';
        for(var i in YY){
            str += strNum[YY[i]];
        }
        YY = str;
        // 月
        var str = '';
        for(var i in MM){
            str += strNum[MM[i]];
        }
        MM = str;
        // 日
        var str = '';
        for(var i in DD){
            str += strNum[DD[i]];
        }
        DD = str;
    }

    // 年
    arg = arg.replace('YY',YY);
    // 月
    arg = arg.replace('MM',MM);
    // 日
    arg = arg.replace('DD',DD);
    // 时
    arg = arg.replace('HH',HH);
    // 分
    arg = arg.replace('mm',mm);
    // 秒
    arg = arg.replace('SS',SS);
    t = null;
    return arg;
}