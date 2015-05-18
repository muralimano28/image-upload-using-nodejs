var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var path = require("path");
var url = require("url");

function first(response)
{
    console.log("Request handler first was called");
    fs.readFile("first.html", "binary" , function(err,file)
                {
                    if(err)
                    {
                       response.writeHead(500,{"Content-Type" : "Text/plain"});
                       response.write("Webpage not available");
                       response.end();
                    }
                    else
                    {
                        response.writeHead(200,{"Content-Type" : "text/html"});
                        response.write(file);
                        response.end();
                    }
                });
}

function start(response)
{
    console.log("Request handler start was called");
    
    
        fs.readFile("index.html", "binary" , function(err,file)
                {
                    if(err)
                    {
                       response.writeHead(500,{"Content-Type" : "Text/plain"});
                       response.write("Webpage not available");
                       response.end();
                    }
                    else
                    {
                        response.writeHead(200,{"Content-Type" : "text/html"});
                        response.write(file);
                        response.end();
                    }
                });
   
    
    /*var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content= "text/html; charset = UTF-8">'+
        '</head>'+
        '<body>' +
        '<form action = "/update" method="post">' +
        '<div> Enter your name: <input type = "text" name = "firstname"></input>&nbsp;' +
        '<div> <textarea name = "text" height = "250" width = "250" ></textarea> </div>' +
        '<input type = "submit" value = "Submit Text"> </div>' +
        '</form>' +
        '</body>' +
        '</html>';
    
    response.writeHead(200,{"Content-Type" : "text/html"});
    response.write(body);
    response.end(); */
   /* var content = "empty";
    exec("find /", function(error,stdout,stderr)
         {
        content = stdout;
        response.writeHead(200,{"Content-Type" : "Text/plain"});
        response.write(content);
        response.end();
    }); */
    
    /*function sleep(milliSeconds,callback)
    {
        var startTime = new Date().getTime();
        while(new Date().getTime() < (startTime + milliSeconds));
        callback("Hello start");
    }
    sleep(10000);*/
    
}

function update(response,request)
{
    var form = new formidable.IncomingForm();
    form.parse(request,function(error,fields,files){ 
        fs.rename(files.upload.path,path.join(process.cwd(),"/test.png"),function(error){
            if(error)
            {
                fs.unlink(path.join(process.cwd(),"/test.png"));
                fs.rename(files.upload.path,path.join(process.cwd(),"/test.png"));
            }
            response.writeHead(200,{"Content-Type" : "Text/html"});
            response.write("<h1>Received Image...</h1>");
            response.write("<img src = '/show' alt = 'Uploaded Image' />");
            response.end();
        });
    });
}

function show(response)
{
    console.log("Request handler show was called");
    fs.readFile(path.join(process.cwd(),"/test.png"),function(error,file){
        if(error)
        {
            response.writeHead(200,{"Content-type" : "Text/plain"});
            response.write("Error while loading the image");
            response.end();
        }
        else
        {
            response.writeHead(200,{"Content-Type" : "image/png"});
            response.write(file,"binary");
            response.end();
        }
    });
    
}

function username(request,response)
{
    var usr_name = "";
    console.log("Request handler for username was called");
    /*exec("whoami",function(error,stdout,stderr){
        if(error)
        {
            response.writeHead(500,{"Content-Type" : "Text/Plain"});
            response.write("Error with username function");
            response.end();
        }
        else
        {
            var usr_name = stdout;
            var name = usr_name.substr(3,8);
            if(name == "bgh38424")
            {
                name = "Muralimanohar";
            }
            else if(name == "bgh38441")
            {
                name = "Dipesh singh";
            }
            response.writeHead(200,{"Content-Type" : "Text/html"});
            response.write("<h1 align='center'>Welcome " + name + "!</h1>");
            response.end();
        }
    }); */
    response.writeHead(200,{"Content-Type" : "Text/html"});
    response.write("<h1 align='center'>Welcome " + request.username + "!</h1>");
    response.end();
}
exports.start = start;
exports.update = update;
exports.show = show;
exports.username = username;
exports.first = first;