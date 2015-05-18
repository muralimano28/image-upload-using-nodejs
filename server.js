var http = require("http");
var url = require("url");

function start(route, handle)
{
    function processRequest(request,response)
    {
        console.log("request received");
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        /*request.addListener("data",function(postDataChunk)
                            {
                                postData += postDataChunk;
                                console.log("Received the chunk '" + postDataChunk + "'.");
                            });
        request.addListener("end",function()
                            { */
                                route(pathname,handle,response,request);
                        /*    }); */
    }

    http.createServer(processRequest).listen(8888,"10.203.200.145");
    console.log("Server started");
}

exports.start = start;