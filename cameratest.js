

var Camera = require("camerapi");

var cam = new Camera();


//cam.baseDirectory('/YOUR_BASE_DIRECTORY');

cam.prepare({"timeout" : 150, 
		 "width" : 2592,
		 "height" : 1944,
		 "quality" : 85
	   }).takePicture("mypicture.jpg");
