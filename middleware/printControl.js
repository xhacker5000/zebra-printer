var PrintControl = {};
var netManager = require('./netManager')
var Printer = require('../lib');


PrintControl.init = function(){
    netManager.registCallBack('print_label',PrintControl.print_label);
    console.log('打印模块已加载');
}


PrintControl.print_label = function(data,socket,printer_name){

    console.log('执行打印任务',printer_name);
    var image_data = data;
    Printer.printDirect({
        data:image_data,
        printer:printer_name,
        type:'RAW',
        success:function(){
            console.log('Printed Done');
        }
    })
}

module.exports = PrintControl;