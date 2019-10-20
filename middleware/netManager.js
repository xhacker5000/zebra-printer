var netManager = {};



netManager.callback_pool = {};
netManager.on_disconnect_router = undefined;

/*
    sturct: {
        name:String
        callback:function()
    }
*/


var WebSocketServer = require('ws').Server;

function heartbeat() {
    this.isAlive = true;
}


netManager.regist_disconnect_router_handler = function(handler){
    netManager.on_disconnect_router = handler;
}

netManager.initWebsocket = function(){
    console.log('网络初始化');
    var wss = new WebSocketServer({ port: 12310 });


    wss.on('connection',function connection(ws){


        console.log('C#设备连接');


        ws.isAlive = true;
        ws.on('pong', heartbeat);

        var client_ws = ws;
        ws.on('message', function incoming(data) {
            
            console.log(data);
            var webPacket,cmd,data,printer_name;
            try{
                      webPacket  = JSON.parse(data);
                      cmd = webPacket.cmd;
                      data = webPacket.data;
                      printer_name = webPacket.printer_name;                                  
                      console.log('收到消息',cmd);
                      
            }
            catch(e){
                    console.log('websocket 未知命令',data);
                    netManager.sendMessage('websocket 未定义命令',client_ws); 
                    return;
            }	

            //登录逻辑单独处理在loginConroller;
            var callbackFunc = netManager.callback_pool[cmd];
            if(callbackFunc){
                callbackFunc(data,client_ws,printer_name);
            }



            
        })

        function on_player_disconnect(err){
               console.log('C#打印设备失去连接',err);
        }

        ws.on('error',on_player_disconnect);

        ws.on('close',on_player_disconnect)

        
    })  

    //与客户端保持心跳
    const interval = setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
          if (ws.isAlive === false) return ws.terminate();
      
          ws.isAlive = false;
          ws.ping('', false, true);
        });
      }, 20000);



}


netManager.registCallBack = function(cmd, cb){

    console.log('注册命令',cmd)
	if(netManager.callback_pool[cmd] == undefined){
		netManager.callback_pool[cmd] = cb;
	}
	else{
		console.log('already regist event' , cmd);
	}		

}

netManager.sendMessage = function(msg,ws){
    
    var str = null;
    try{
        var str = JSON.stringify(msg);
    }
    catch(e){
        console.log('sendMessage JSON Strinify出错',e,msg);
    }

	try{
        
		ws.send(str);
		return true;
	}
	catch(e){
		//send faild
        console.log('sendwebpacket send faild',ws.openId,e);
		return false;
	}
}





module.exports = netManager;
