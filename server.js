var http=require('http');
var sys=require("sys"),
    url=require('url'),
    path=require('path'),
    fs=require('fs');

sys.puts('hello world');

http.createServer(function(request,response){
    var uri=url.parse(request.url).pathname;
    var filename=path.join(process.cwd(),uri);
    fs.exists(filename,function(exists){
        if(!exists){
            response.writeHead(404,{
                'Content-Type':'text/plain'
            });
            response.write('404 Not Found\n');
            response.end();
            return;
        }
    })

    fs.readFile(filename,'binary',function(err,file){
        if(err){
            response.writeHead(500,{
                'Content-Type':'text/plain'
            });
            response.write(err+"\n");
            response.end();
            return;
        }
    })

    response.writeHead(200,{
        'Content-Type':'text/html'
    });
    response.end('hello fitbit');
}).listen(7788);

console.log('Server running at http://127.0.0.1:7788');
