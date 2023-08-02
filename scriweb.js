/*
* Software SCRIWEB
*/
//-----------------------------------------
//Iniciando servidor HTTP
//-----------------------------------------
  	const PORT = process.env.PORT || 4333;	
    	//var path = require('path');
    	var express = require('express');
    	var app = express();
    	var router = express.Router();
    	var server = require('http').Server(app);
    	//var io = require('socket.io')(server);
	//const recursiveReaddir = require('recursive-readdir');
	//recursiveReaddir('./scriweb/simulacao', (err, files) => {
  	//	if (err) {
    	//		console.error(err);
    	//		return;
  	//	}
  		//console.log(files);
	//});
    	app.use(express.static(__dirname + '/public'));
	app.use('/ftp', express.static(__dirname + '/scriweb/simulacao'));
    	app.get('/', function(req, res) {
        	res.sendFile(__dirname + '/scriweb.html');
    	});
    	app.get('/about',function(req,res){
        	res.sendFile(__dirname + '/scriwebabout.html');
    	});
    	app.get('/help',function(req,res){
        	res.sendFile(__dirname + '/scriwebhelp.html');
    	});
    	app.get('/helpsim',function(req,res){
        	res.sendFile(__dirname + '/simhelp.html');
    	});
	app.get('/popup',function(req,res){
        	res.sendFile(__dirname + '/popup.html');
    	});
	server.listen(PORT,function() {
 		console.log("__________________________________________________________________");
    		console.log("|      SUPERVISORIO WEB INFORMATICA INDUSTRIAL rodando!           |");
    		console.log("| Neste servidor foi gerado uma pagina HTML                       |");
    		console.log("|                                                                 |");
    		console.log("| Execute no Browser para criar/alterar/monitorar/simular         |");
    		console.log("|    localhost:4333 ou XXX.XXX.XXX.XXX:4333                       |");
    		console.log("___________________________________________________________________");
		console.log(__dirname);
		
    	});
