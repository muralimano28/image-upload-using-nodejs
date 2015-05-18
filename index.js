var server = require("./server");
var router = require("./router");
var handler = require("./routerhandler");

var handle = {};
handle["/"] = handler.first;
handle["/start"] = handler.start;
handle["/update"] =  handler.update;
handle["/show"] = handler.show;
handle["/username"] = handler.username;

server.start(router.route, handle); 