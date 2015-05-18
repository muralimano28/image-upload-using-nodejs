function route(pathname,handle,response,request)
{
    if(typeof handle[pathname] === "function")
    {
        handle[pathname](response,request,pathname);
    }
    else
    {
        console.log("Request handler is not found for the given pathname : " + pathname);
        response.writeHead(200,{"Content-type" : "text/plain"})
        response.write("404 Not Found");
        response.end();
    }
}
exports.route =  route;

