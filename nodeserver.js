var net = require('net')
var http = require('http')


var port = 8080;

var server = http.createServer(function (request, response) {
			
	
  switch(request.url) {

    default:
      response.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      response.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
	  
	  
      console.log("[404] " + request.method + " to " + request.url);
	  
	  
	  
  };


  
			

		  
		  
		  
	
	});

server.listen(port);
