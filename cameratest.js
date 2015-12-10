

var fs = require("fs")
var RaspiCam = require("raspicam");


var camera = new RaspiCam({

	mode: "photo",
	output: "./photo/image.jpg",
	encoding: "jpg",
	timeout: 0 // take the picture immediately
});

camera.on("started", function( err, timestamp ){
	console.log("photo started at " + timestamp );
});

camera.on("read", function( err, timestamp, filename ){
	console.log("photo image captured with filename: " + filename );
	
	//camera.stop();

});


camera.on("exit", function( timestamp ){
	console.log("photo child process has exited at " + timestamp );
	
});




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



if( camera.start()==true ){
	console.log("camera started correctly")
	
}
else{
	console.log("camera started wrong");
	
}



 





