// 重写
var t = require('./tool');

// window
var w = t.w;

/**
 *
 *
 * @param {string} arg YY-MM-DD
 * @param {time} time 时间戳
 * @param {Boolean} b 中文大小写
 * @returns
 */
w.showTime = function (arg,time,b){
    var b = b || false;

    typeof(time) != 'number' ? time = parseInt(time): time;

    var t = time ? new Date(time) :new Date();

    var strNum = ['零','一','二','三','四','五','六','七','八','九'];
    
    var YY = t.getFullYear()
    var MM = (t.getMonth() + 1) < 10? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
    var DD = t.getDate() < 10? '0' + t.getDate() : t.getDate();
    var hh = t.getHours() < 10? '0' + t.getHours() : t.getHours();
    var mm = t.getMinutes() < 10? '0'+ t.getMinutes() : t.getMinutes();
    var ss = t.getSeconds() < 10? '0'+ t.getSeconds() : t.getSeconds();
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
    arg = arg.replace('hh',hh);
    // 分
    arg = arg.replace('mm',mm);
    // 秒
    arg = arg.replace('ss',ss);
    t = null;
    return arg;
}