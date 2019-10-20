var PrintControl = {};
var netManager = require('./netManager')
var Printer = require('../lib');
var WashHelper = require('./wash_data');


PrintControl.init = function(){
    netManager.registCallBack('print_label',PrintControl.print_label);
    netManager.registCallBack('get_wash_info',PrintControl.get_wash_info);
    console.log('打印模块已加载');
}


PrintControl.get_wash_info = function(data,socket){
    console.log('获取洗涤数据');
    var all_data = WashHelper.get_all_data();
    var packet = {};
    packet.cmd = 'wash_notice';
    packet.data = {};
    packet.data.data_list = all_data;
    netManager.sendMessage(packet,socket);
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