var netManager = require('./middleware/netManager');
var printControl = require('./middleware/printControl');


netManager.initWebsocket();
printControl.init();


