var net = require('net')
var http = require('http')
var fs = require('fs')


var dispatcher = require('httpdispatcher');

var RaspiCam = require("raspicam");


/*
var camera = new RaspiCam({

	mode: "photo",
	output: "./photo/image.jpg",
	encoding: "jpg",
	timeout: 0 // take the picture immediately
});
*/



// test
var port = 8080;



dispatcher.setStaticDirname(__dirname);
dispatcher.setStatic("photo");

//A sample GET request    
dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});    

//A sample GET request    
dispatcher.onGet("/page2", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page two');
});    

//A sample GET request    
dispatcher.onGet("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
	
	var buf = fs.readFileSync("template.html");
	
	var arr = buf.toString();
	
    res.end(arr);
	
	
	
});    





//A sample GET request    
dispatcher.onGet("/camera", function(req, res) {
	
	
	
	
	//fs.unlinkSync('./photo/image.jpg');
	/*
	fs.exists('photo/image.jpg', function (exists) {
	//console.log(exists ? "it's there" : 'no passwd!');
		if(exists){
			fs.unlinkSync('photo/image.jpg', function (err) {
			  if (err) throw err;
			  console.log('deleted photo/image.jpg');
			});
		}
			
	});
	
	fs.exists('photo/image.jpg~', function (exists) {
	//console.log(exists ? "it's there" : 'no passwd!');
		if(exists){
			fs.unlinkSync('photo/image.jpg~', function (err) {
			  if (err) throw err;
			  console.log('  deleted photo/image.jpg~ ');
			});
		}
			
	});
	*/
	/*
    try {
      	
		fs.unlinkSync('photo/image.jpg');
	
    } catch(err) {
        console.log(err);
    }		

  try {
      	
		fs.unlinkSync('photo/image.jpg~');
	
    } catch(err) {
        console.log(err);
    }		
*/
	
	
	/*
	fs.unlinkSync('photo/image.jpg~', function (err) {
		if (err){ 
		
			console.log( err)
		
		}
	  console.log('deleted photo/image.jpg~');
	});
	*/
	
	var firsttime=true;
	
	
	var camera = new RaspiCam({
		//imxfx : "negative",
		mode: "photo",
		output: "./photo/image.jpg",
		encoding: "jpg",
		timeout: 0 // take the picture immediately
	});
	
	
	camera.start();
	
	camera.on("read", function( err, timestamp, filename ){
		console.log("photo image captured with filename: " + filename );
		
		if( firsttime==true){
			firsttime=false;
				
		}
		else{
			camera.stop();

			var date = new Date().getTime()
			
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write("<html><head><title>camera taken</title></head><body><h1><img src='/photo/image.jpg?cachebuster=" +date+ "'> </h1></body></html>");
		
		
			res.end('new picture taken');
		}
	});
	
	
	
});    





//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
	console.log("post data")
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});


var server = http.createServer( function (request, response) {
			
	/*
  switch(request.url) {

	  default:
      response.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      response.end('<html><head><title>404 - Not found</title></head><body><h1><img src="/photo/image.jpg"> Not found!</h1></body></html>');
	  
	  
      console.log("[404] " + request.method + " to " + request.url);

	
	  
	  
	  
  };

*/
  
	
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }		

		  
		  
		  
	
	});

server.listen(port);
