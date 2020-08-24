
var socket = io(); //('http://192.168.0.100:4333');
var num_clp = 0;
socket.emit('connect', num_clp);
socket.on('memoria', function(data) {
	   M = data.split(',');
});
socket.on('timer', function(data) {
	   T = data.split(',');
});
socket.on('counter', function(data) {
	   C = data.split(',');
});
socket.on('entrada', function(data) {
       I = data.split(',');
});
socket.on('tr', function(data) {
       R = data.split(',');
});
socket.on('localizacao', function(data) {
       localizacao = data;
});
socket.on('saida', function(data) {
       Q = data.split(',');
	 liga_led_CLP();
	if (comandos != 0) {
			monitora_ladder();
	};
});

function config(dado){
    	socket.emit('clp', dado);
    	num_clp = dado;
    	context.font = '36pt Arial';
  	context.fillStyle = 'black';
	context.filltext(parseStr(num_clp), 76, 227);
}

function Enviar(){
	var data = I.join()+ ','+ num_clp;
    socket.emit('programax', programa+ ','+ num_clp);
    socket.emit('comandosx', comando+ ','+ num_clp);
    socket.emit('entradax',data);
}

function envia_entrada(data){
	while (data.length < I.length) {
		data[data.length] = I[data.length];
	}
     socket.emit('entradax', data.join()+ ','+ num_clp);
}


